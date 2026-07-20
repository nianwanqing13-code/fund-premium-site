# -*- coding: utf-8 -*-
"""
基金溢价率网站 —— 后端

功能：
1. 从 AKShare（免费开源数据源）获取当日场内基金（ETF / LOF）的：
   - 最新市价（场内成交价）
   - IOPV 实时估值（当日预估净值）
2. 计算溢价率： (市价 - 预估净值) / 预估净值 * 100%
   - 溢价率 > 0 表示溢价（市价比净值贵，可能存在卖出/赎回套利机会）
   - 溢价率 < 0 表示折价（市价比净值便宜，可能存在买入套利机会）
3. 提供网页和数据接口，支持按溢价率排序。
4. 展示每只 LOF 的「申购状态」（开放申购 / 限大额 / 暂停申购）与「可申购数额」，
   ETF 标注为实物申赎；并展示「申购时间」。

运行方式：
   双击 “启动网站.bat”，或在命令行执行：
   python app.py
然后浏览器打开：http://127.0.0.1:5000
"""

import os
# 清除可能残留的代理环境变量（例如 127.0.0.1:7897 死代理），
# 避免 AKShare 联网被死代理阻断（本地双击 .bat 运行时尤其常见）。
for k in ["HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy", "ALL_PROXY", "all_proxy"]:
    os.environ.pop(k, None)
os.environ["NO_PROXY"] = "*"
os.environ["no_proxy"] = "*"

import time
import datetime
import math
import traceback
import threading
from concurrent.futures import ThreadPoolExecutor

import akshare as ak
import pandas as pd
import requests
import re
import json
from flask import Flask, jsonify, render_template, request

# ETF / LOF 并行获取，LOF 连不上时最多等这么久，避免拖垮整页
_LOF_TIMEOUT = 12

app = Flask(__name__)

# ---------------------------------------------------------------------------
# 简单的内存缓存：避免频繁请求数据源被限制，默认缓存 60 秒
# ---------------------------------------------------------------------------
_CACHE = {"data": None, "time": 0}
_CACHE_SECONDS = 60
_fetch_lock = threading.Lock()   # 防止并发请求各自触发一次完整抓取
_REFRESHING = False              # 后台刷新标志，避免并发重复触发抓取


# 北京时间（UTC+8）。Render 等云平台容器默认时区为 UTC，
# 直接用 datetime.now()/time.strftime() 会拿到 UTC 时间，比北京时间晚 8 小时，
# 导致页面“更新时间”显示错误、交易时段判断也错位。故统一用显式北京时间。
_BEIJING_TZ = datetime.timezone(datetime.timedelta(hours=8))


def beijing_now():
    """返回当前北京时间（带时区），用于页面时间显示与交易时段判断。"""
    return datetime.datetime.now(_BEIJING_TZ)


def is_trade_time():
    """判断当前是否处于基金场内交易 / 申购时段（周一~周五 9:30-11:30、13:00-15:00）。"""
    now = beijing_now()
    if now.weekday() >= 5:          # 5=周六, 6=周日
        return False
    t = now.time()
    morning = datetime.time(9, 30) <= t <= datetime.time(11, 30)
    afternoon = datetime.time(13, 0) <= t <= datetime.time(15, 0)
    return morning or afternoon


# ---------------------------------------------------------------------------
# 基金申购状态（开放申购 / 限大额 / 暂停申购）与可申购数额（日累计申购限额）：
# 来自天天基金「基金费率」档案页 jjfl_<代码>.html。
# 仅对 LOF 取数——LOF 支持场内现金申购，申购状态/限额对溢价套利直接有意义；
# ETF 为实物申赎（需一篮子股票），其现金申购状态指向场外联接基金，故单列说明。
# 失败时不影响主溢价数据。
# ---------------------------------------------------------------------------
_SUBSCRIBE_CACHE = {"map": None, "time": 0}
_SUBSCRIBE_TTL = 3600  # 1 小时（申购状态/限额日内很少变动）
_SUB_BUILDING = False   # 后台构建标志，避免并发重复触发

_JJFL_RE_STATUS = re.compile(r"交易状态：<span>([^<]+)</span>")
_JJFL_RE_LIMIT = re.compile(r"日累计申购限额</td><td[^>]*>([^<]+)</td>")


def _fetch_subscribe_one(code):
    """抓取单只 LOF 的申购状态与日累计申购限额，返回 (status, limit)。"""
    try:
        r = requests.get(
            "https://fundf10.eastmoney.com/jjfl_%s.html" % code,
            headers=_LOF_HEADERS, timeout=8,
        )
        t = r.text
        m = _JJFL_RE_STATUS.search(t)
        status = m.group(1).strip() if m else ""
        m2 = _JJFL_RE_LIMIT.search(t)
        limit = m2.group(1).strip() if m2 else ""
        return status, limit
    except Exception:
        return "", ""


def _parse_limit_to_num(limit):
    """把「日累计申购限额」文本解析为数值（单位：元），无法解析返回 None。

    例："50.00万元" -> 500000.0，"1000.00元" -> 1000.0，"无" -> None。
    用于前端对「可申购数额」列排序。
    """
    s = (limit or "").strip()
    if not s or "无" in s:
        return None
    m = re.search(r"([\d,]+(?:\.\d+)?)\s*(万|亿)?", s)
    if not m:
        return None
    try:
        num = float(m.group(1).replace(",", ""))
    except ValueError:
        return None
    unit = m.group(2)
    if unit == "万":
        num *= 10000
    elif unit == "亿":
        num *= 100000000
    return num


def _normalize_subscribe(status, limit):
    """把原始「交易状态」与「日累计申购限额」整理成展示用的 (label, amount, cls, amount_num)。

    返回 (label, amount, cls, amount_num)：
      - label     : 展示文字（含可否申购的判断）
      - amount    : 可申购数额文字（仅“可申购”时有值，否则为空）
      - cls       : 前端配色类名 sub-open / sub-limit / sub-pause / sub-na
      - amount_num: 可申购数额的数值（单位：元），用于排序；无法解析为 None
    """
    s = (status or "").strip()
    if s == "":
        return ("", "", "sub-na", None)
    if "暂停" in s:
        # 暂停申购：不可申购，限额无意义
        return ("暂停申购（不可申购）", "", "sub-pause", None)
    if "限" in s:
        # 限大额：可申购，但有限额 -> 数额即“可申购的数额”
        amt = (limit or "").strip()
        if amt and "无" not in amt:
            return ("限大额·可申购", amt, "sub-limit", _parse_limit_to_num(amt))
        return ("限大额·可申购", "", "sub-limit", None)
    if "开放" in s:
        amt = (limit or "").strip()
        if amt and "无" not in amt:
            return ("开放申购·可申购", amt, "sub-open", _parse_limit_to_num(amt))
        return ("开放申购·可申购", "", "sub-open", None)
    return (s, "", "sub-na", None)


def _build_subscribe_map():
    """后台线程：抓取全部 LOF 的申购状态与数额，写入缓存。"""
    global _SUBSCRIBE_CACHE, _SUB_BUILDING
    _SUB_BUILDING = True
    try:
        lof_df = fetch_lof_list()
        codes = [str(c).strip() for c in lof_df["代码"].tolist() if str(c).strip()]
        # 并行抓取每只 LOF 的申购信息（约数百只，受天天基金节流影响可能需数十秒）
        with ThreadPoolExecutor(max_workers=16) as pool:
            results = pool.map(_fetch_subscribe_one, codes)
        m = {}
        for code, (status, limit) in zip(codes, results):
            label, amount, cls, amount_num = _normalize_subscribe(status, limit)
            if label:
                m[code] = {"label": label, "amount": amount, "cls": cls, "amount_num": amount_num}
        _SUBSCRIBE_CACHE["map"] = m
        _SUBSCRIBE_CACHE["time"] = time.time()
    except Exception:
        traceback.print_exc()
        if _SUBSCRIBE_CACHE["map"] is None:
            _SUBSCRIBE_CACHE["map"] = {}
    finally:
        _SUB_BUILDING = False


def get_subscribe_map():
    """返回 {LOF代码: {label, amount, cls}} 映射。

    命中 1 小时缓存则直接返回；否则立即返回当前已有内容（可能为空），
    并在后台启动一次完整构建，前端通过自动刷新自然补齐。
    """
    global _SUBSCRIBE_CACHE, _SUB_BUILDING
    now = time.time()
    if _SUBSCRIBE_CACHE["map"] is not None and (now - _SUBSCRIBE_CACHE["time"] < _SUBSCRIBE_TTL):
        return _SUBSCRIBE_CACHE["map"]
    if not _SUB_BUILDING:
        threading.Thread(target=_build_subscribe_map, daemon=True).start()
    return _SUBSCRIBE_CACHE["map"] or {}


def _to_float(value):
    """把接口返回的值安全地转成 float，转不了就返回 None。"""
    try:
        if value is None:
            return None
        f = float(value)
        # NaN 判断（NaN 不等于自身）
        if f != f:
            return None
        return f
    except (TypeError, ValueError):
        return None


# ---------------------------------------------------------------------------
# LOF 行情：自行抓取东方财富接口
# 说明：
#   - akshare 的 fund_lof_spot_em() 当前会触发东方财富连接重置(RemoteDisconnected)，
#     且返回字段里没有 IOPV，无法计算溢价率。这里改用 push2delay 主机 + 浏览器
#     请求头 + 分页拉取全部，稳定返回；LOF 没有实时 IOPV，改用
#     f402「折价率」反推溢价率：溢价率 = -折价率。
#   - 东方财富 clist 接口默认每页 100 条、超大 pz 会被静默钳回 100，因此必须像
#     akshare 一样先取 total 再分页遍历，才能拿全量数据。
# ---------------------------------------------------------------------------
_LOF_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Referer": "https://quote.eastmoney.com/",
    "Accept": "application/json, text/plain, */*",
}


def _fetch_eastmoney_clist(fs, fields, page_size=1000):
    """分页抓取东方财富 clist 接口，返回原始字段 dict 的列表（list[dict]）。"""
    url = "https://push2delay.eastmoney.com/api/qt/clist/get"
    base = {
        "pn": "1", "pz": str(page_size), "po": "1", "np": "1",
        "ut": "bd1d9ddb04089700cf9c27f6f7426281",
        "fltt": "2", "invt": "2", "wbp2u": "|0|0|0|web",
        "fid": "f3",
        "fs": fs,
        "fields": fields,
    }
    all_diff = []
    last_err = None
    # 重试次数与时长都做了上限：单页抓取最坏约 2×12s=24s，
    # 配合“后台刷新”机制，避免抓取卡死导致请求/网关超时“无响应”。
    for attempt in range(2):
        try:
            r = requests.get(url, params=base, headers=_LOF_HEADERS, timeout=12)
            r.raise_for_status()
            data = r.json().get("data") or {}
            total = data.get("total") or 0
            diff = data.get("diff") or []
            if not diff:
                last_err = Exception("返回数据为空")
                time.sleep(1 + (attempt % 3))
                continue
            all_diff.extend(diff)
            per_page = len(diff)
            pages = max(1, math.ceil(total / per_page)) if total else 1
            # 翻剩余页（去掉 akshare 的 0.5~1.5s 随机延迟，仅留极短间隔，提速明显）
            for pn in range(2, pages + 1):
                p = dict(base)
                p["pn"] = str(pn)
                rr = requests.get(url, params=p, headers=_LOF_HEADERS, timeout=12)
                d2 = (rr.json().get("data") or {}).get("diff") or []
                all_diff.extend(d2)
                time.sleep(0.1)
            return all_diff
        except Exception as e:
            last_err = e
            time.sleep(1 + (attempt % 3))
    if last_err:
        print("[警告] 获取基金列表失败：", last_err)
    return all_diff


def fetch_lof_list():
    """抓取东方财富 LOF 实时行情，返回 pandas.DataFrame（含 代码/名称/最新价/涨跌幅/折价率）。"""
    diff = _fetch_eastmoney_clist(
        fs="b:MK0404,b:MK0405,b:MK0406,b:MK0407",
        fields="f12,f14,f2,f3,f402",
    )
    rows = [
        {
            "代码": str(it.get("f12", "")).strip(),
            "名称": str(it.get("f14", "")).strip(),
            "最新价": it.get("f2"),
            "涨跌幅": it.get("f3"),
            "折价率": it.get("f402"),
        }
        for it in diff
    ]
    return pd.DataFrame(rows, columns=["代码", "名称", "最新价", "涨跌幅", "折价率"])


def fetch_etf_list():
    """抓取东方财富 ETF 实时行情（含 IOPV f441）。"""
    diff = _fetch_eastmoney_clist(
        fs="b:MK0021,b:MK0022,b:MK0023,b:MK0024,b:MK0827",
        fields="f12,f14,f2,f3,f441",
    )
    rows = [
        {
            "代码": str(it.get("f12", "")).strip(),
            "名称": str(it.get("f14", "")).strip(),
            "最新价": it.get("f2"),
            "涨跌幅": it.get("f3"),
            "IOPV实时估值": it.get("f441"),
        }
        for it in diff
    ]
    return pd.DataFrame(rows, columns=["代码", "名称", "最新价", "涨跌幅", "IOPV实时估值"])


def _fetch_one(fund_type, fetch_func):
    """
    获取一类基金（ETF 或 LOF）的实时行情并整理成统一格式。
    任何异常都不会中断整体，只返回空列表。
    """
    records = []
    try:
        df = fetch_func()
        if df is None or df.empty:
            return records

        for _, row in df.iterrows():
            price = _to_float(row.get("最新价"))

            if fund_type == "LOF":
                # LOF 没有实时 IOPV，用「折价率」反推：折价率=(净值-市价)/净值，负数为溢价
                disc = _to_float(row.get("折价率"))
                if price is None or disc is None:
                    continue
                premium = -disc
                iopv_val = None
            else:
                iopv = _to_float(row.get("IOPV实时估值"))
                if price is None or iopv is None or iopv <= 0:
                    continue
                premium = (price - iopv) / iopv * 100.0
                iopv_val = iopv

            records.append(
                {
                    "code": str(row.get("代码", "")).strip(),
                    "name": str(row.get("名称", "")).strip(),
                    "type": fund_type,
                    "price": round(price, 4),          # 当日市价
                    "iopv": round(iopv_val, 4) if iopv_val is not None else None,  # 预估净值(LOF 无)
                    "premium": round(premium, 3),      # 溢价率(%)
                    "change_pct": _to_float(row.get("涨跌幅")),  # 当日涨跌幅(%)
                }
            )
    except Exception:
        # 打印错误方便排查，但不影响其它类型基金
        print(f"[警告] 获取 {fund_type} 数据失败：")
        traceback.print_exc()
    return records


def _fetch_all_records():
    """抓取全部场内基金（ETF+LOF）实时行情并整理成统一格式（阻塞，可能较慢）。"""
    all_records = []
    # ETF 与 LOF 并行获取（均为自行请求 push2delay，单页拉取，约数秒完成）
    with ThreadPoolExecutor(max_workers=2) as pool:
        f_etf = pool.submit(_fetch_one, "ETF", fetch_etf_list)
        f_lof = pool.submit(_fetch_one, "LOF", fetch_lof_list)
        all_records += f_etf.result()
        all_records += f_lof.result()
    # 默认按溢价率从高到低排序
    all_records.sort(key=lambda x: x["premium"], reverse=True)
    return all_records


def _background_refresh():
    """后台刷新缓存，绝不阻塞请求线程。

    用 _fetch_lock 串行化抓取；用 _REFRESHING 标志避免并发重复触发。
    """
    global _CACHE, _REFRESHING
    if _REFRESHING:
        return
    _REFRESHING = True
    try:
        with _fetch_lock:
            all_records = _fetch_all_records()
            _CACHE["data"] = all_records
            _CACHE["time"] = time.time()
        # 后台提醒（不阻塞）
        threading.Thread(target=check_and_alert, daemon=True).start()
    except Exception:
        traceback.print_exc()
    finally:
        _REFRESHING = False


def get_fund_premium():
    """获取全部场内基金的溢价率数据（带缓存，永不因抓取超时卡死请求）。

    行为：
    - 缓存新鲜：直接返回。
    - 缓存过期但仍有旧数据：立即返回旧数据，并在后台静默刷新（用户无感知）。
    - 完全无缓存（首拉/刚清空）：立即返回现有缓存（可能为空），并在后台抓取；
      前端每 60 秒自动刷新会自然补齐，避免请求长时间挂起被网关超时“无响应”。
    """
    global _CACHE
    now = time.time()
    fresh = _CACHE["data"] is not None and (now - _CACHE["time"] < _CACHE_SECONDS)
    if not fresh:
        # 触发一次后台刷新（内部有 _REFRESHING 去重，不会重复抓取）
        threading.Thread(target=_background_refresh, daemon=True).start()
    return _CACHE["data"] or []


# ---------------------------------------------------------------------------
# 溢价套利提醒：当「开放申购」的 LOF 溢价率超过阈值时，推送到 微信/钉钉/飞书。
# 配置持久化：优先用 Postgres（环境变量 DATABASE_URL），未配置时回退到本地 JSON 文件。
# ---------------------------------------------------------------------------
ALERT_CONFIGS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "alert_configs.json")
_ALERT_COOLDOWN = 30 * 60  # 同一只基金两次推送的最小间隔（秒），避免刷屏
_last_alert = {}            # {用户key: {基金代码: 上次推送时间戳}}，按用户独立冷却

# ---- Postgres 持久化（Render 免费版磁盘不持久，配置会随重启丢失；用 DB 解决）----
_DATABASE_URL = os.environ.get("DATABASE_URL")   # Render 注入的数据库连接串


def _db_conn():
    """打开一个数据库连接；未配置 DATABASE_URL 或连接失败则返回 None（回退 JSON）。"""
    if not _DATABASE_URL:
        return None
    try:
        import psycopg2
        return psycopg2.connect(_DATABASE_URL, connect_timeout=5)
    except Exception:
        traceback.print_exc()
        return None


def _init_db():
    """建表（首次部署时）。失败不影响启动，仅该次持久化不可用。"""
    conn = _db_conn()
    if conn is None:
        return
    try:
        cur = conn.cursor()
        cur.execute("CREATE TABLE IF NOT EXISTS alert_configs "
                    "(key TEXT PRIMARY KEY, data TEXT)")
        conn.commit()
    except Exception:
        traceback.print_exc()
    finally:
        cur.close()
        conn.close()


def _db_load_all():
    """从 DB 读全部配置；失败返回 None（调用方回退 JSON）。"""
    conn = _db_conn()
    if conn is None:
        return None
    try:
        cur = conn.cursor()
        cur.execute("SELECT key, data FROM alert_configs")
        rows = cur.fetchall()
        return {r[0]: json.loads(r[1]) for r in rows}
    except Exception:
        traceback.print_exc()
        return None
    finally:
        cur.close()
        conn.close()


def _db_save_one(key, cfg):
    """把单个链接的配置 upsert 进 DB；返回是否成功。"""
    conn = _db_conn()
    if conn is None:
        return False
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO alert_configs(key, data) VALUES(%s,%s) "
            "ON CONFLICT (key) DO UPDATE SET data = EXCLUDED.data",
            (key, json.dumps(cfg, ensure_ascii=False)),
        )
        conn.commit()
        return True
    except Exception:
        traceback.print_exc()
        return False
    finally:
        cur.close()
        conn.close()


def _db_delete_one(key):
    """从 DB 删除单个链接的配置。"""
    conn = _db_conn()
    if conn is None:
        return
    try:
        cur = conn.cursor()
        cur.execute("DELETE FROM alert_configs WHERE key=%s", (key,))
        conn.commit()
    except Exception:
        traceback.print_exc()
    finally:
        cur.close()
        conn.close()


def _default_alert_config():
    return {"members": {}}


def _migrate_member(m):
    """把单个成员（或旧版单平台配置）归一化为 {enabled, threshold, targets:[...]}。无有效目标且未启用则返回 None。"""
    if not isinstance(m, dict):
        return None
    enabled = bool(m.get("enabled", True))
    try:
        threshold = float(m.get("threshold", 8))
    except (TypeError, ValueError):
        threshold = 8.0
    targets = []
    raw = m.get("targets")
    if isinstance(raw, list):                       # 新格式：targets 列表
        for t in raw:
            if isinstance(t, dict) and t.get("webhook"):
                targets.append({"platform": t.get("platform", "dingtalk"),
                                "webhook": str(t["webhook"]).strip()})
    elif m.get("webhook"):                          # 旧格式：单 platform+webhook
        targets.append({"platform": m.get("platform", "dingtalk"),
                        "webhook": str(m["webhook"]).strip()})
    if not targets and not enabled:
        return None
    return {"enabled": enabled, "threshold": threshold, "targets": targets}


def _migrate_cfg(v):
    """归一化为 {members: {owner: {enabled, threshold, targets}}}。兼容旧版单平台配置（归到 owner0）。"""
    d = _default_alert_config()
    if not isinstance(v, dict):
        return d
    members = {}
    raw_members = v.get("members")
    if isinstance(raw_members, dict):               # 新格式：members 字典
        for ok, m in raw_members.items():
            mem = _migrate_member(m)
            if mem:
                members[ok] = mem
    else:                                           # 旧格式：单平台/单 targets，归到一个默认成员
        mem = _migrate_member(v)
        if mem:
            members["owner0"] = mem
    d["members"] = members
    return d


def load_alert_configs():
    """加载全部用户的提醒配置。优先读 Postgres；无 DB 或读失败时回退本地 JSON 文件。"""
    if _DATABASE_URL:
        db_cfgs = _db_load_all()
        if db_cfgs is not None:           # DB 可用：归一化后返回
            return {k: _migrate_cfg(v) for k, v in db_cfgs.items()}
    # 回退：本地 JSON 文件
    try:
        if os.path.exists(ALERT_CONFIGS_PATH):
            with open(ALERT_CONFIGS_PATH, "r", encoding="utf-8") as f:
                cfgs = json.load(f)
            if isinstance(cfgs, dict):
                return {k: _migrate_cfg(val) for k, val in cfgs.items()}
    except Exception:
        traceback.print_exc()
    return {}


def save_alert_configs(cfgs):
    """兜底：把全部配置写入本地 JSON 文件（仅在没有 DB 时使用）。"""
    try:
        with open(ALERT_CONFIGS_PATH, "w", encoding="utf-8") as f:
            json.dump(cfgs, f, ensure_ascii=False, indent=2)
    except Exception:
        traceback.print_exc()


_init_db()   # 首次部署自动建表
_ALERT_CONFIGS = load_alert_configs()
_ALERT_CONFIGS_LOCK = threading.Lock()


def get_user_alert(key):
    """返回某链接的提醒配置；不存在时创建默认配置并落盘。匿名(key 为空)返回默认不落盘。"""
    if not key:
        return _default_alert_config()
    with _ALERT_CONFIGS_LOCK:
        cfg = _ALERT_CONFIGS.get(key)
        if cfg is None:
            cfg = _default_alert_config()
            _ALERT_CONFIGS[key] = cfg
            set_user_alert(key, cfg)
        return cfg


def set_user_alert(key, cfg):
    """保存某链接的提醒配置（匿名 key 不保存）。优先写 DB，失败回退 JSON 文件。"""
    if not key:
        return
    with _ALERT_CONFIGS_LOCK:
        _ALERT_CONFIGS[key] = cfg
        if _DATABASE_URL:
            if not _db_save_one(key, cfg):
                save_alert_configs(_ALERT_CONFIGS)   # DB 不可用则写本地文件兜底
        else:
            save_alert_configs(_ALERT_CONFIGS)


def send_webhook(platform, url, text):
    """按平台格式发送文本消息到 Webhook。返回是否成功。"""
    if not url:
        return False
    try:
        if platform == "serverchan":
            # Server酱（推微信）：表单 title + desp
            r = requests.post(url, data={"title": "基金溢价套利提醒", "desp": text}, timeout=10)
        elif platform == "feishu":
            r = requests.post(url, json={"msg_type": "text", "content": {"text": text}}, timeout=10)
        else:  # dingtalk / wecom 企业微信
            r = requests.post(url, json={"msgtype": "text", "text": {"content": text}}, timeout=10)
        return r.status_code < 400
    except Exception as e:
        print("[提醒] 发送 Webhook 失败：", e)
        return False


def _alert_one(key, cfg):
    """对单个链接的配置做提醒检测与推送：遍历其下每个成员(owner)，各自按自己的阈值/启用状态推送。"""
    members = cfg.get("members") or {}
    if not members:
        return
    if not is_trade_time():
        return  # 仅在交易时段提醒，避免用隔夜陈旧数据误报
    try:
        data = get_fund_premium()
        sub = get_subscribe_map()
    except Exception:
        traceback.print_exc()
        return
    now = time.time()
    key_last = _last_alert.setdefault(key, {})
    for owner, m in members.items():
        if not m.get("enabled") or not m.get("targets"):
            continue
        try:
            threshold = float(m.get("threshold") or 8)
        except (TypeError, ValueError):
            threshold = 8.0
        user_last = key_last.setdefault(owner, {})
        hits = []
        for d in data:
            if d.get("type") != "LOF":
                continue
            s = sub.get(d["code"])
            if not s or s.get("cls") != "sub-open":
                continue
            prem = d.get("premium")
            if prem is None or prem <= threshold:
                continue
            if now - user_last.get(d["code"], 0) < _ALERT_COOLDOWN:
                continue
            user_last[d["code"]] = now
            hits.append(d)
        if not hits:
            continue
        lines = ["【基金溢价套利提醒】开放申购且溢价率>%.1f%% 的 LOF 共 %d 只："
                 % (threshold, len(hits))]
        for d in hits:
            amt = sub.get(d["code"], {}).get("amount", "")
            lines.append("• %s(%s) 溢价率 %.2f%%，可申购%s"
                         % (d["name"], d["code"], d["premium"],
                            ("限额 " + amt if amt else "额度充足")))
        lines.append("时间：%s" % beijing_now().strftime("%Y-%m-%d %H:%M:%S"))
        text = "\n".join(lines)
        for t in m["targets"]:
            ok = send_webhook(t.get("platform", "dingtalk"), t.get("webhook", ""), text)
            print("[提醒] 链接 %s 成员 %s 推送到 %s，结果=%s" % (key, owner, t.get("platform"), ok))


def check_and_alert(key=None):
    """扫描提醒。key 为空时遍历所有用户各自推送；指定 key 时只检查该用户（保存后立即验证用）。"""
    if key:
        _alert_one(key, get_user_alert(key))
        return
    with _ALERT_CONFIGS_LOCK:
        items = list(_ALERT_CONFIGS.items())
    for k, cfg in items:
        try:
            _alert_one(k, cfg)
        except Exception:
            traceback.print_exc()


def _alert_scheduler():
    """后台定时扫描（每 2 分钟一次），覆盖页面未打开但进程存活的情况。"""
    while True:
        time.sleep(120)
        try:
            check_and_alert()
        except Exception:
            pass


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/premium")
def api_premium():
    """返回 JSON 数据给前端。"""
    try:
        data = get_fund_premium()
        return jsonify(
            {
                "ok": True,
                "count": len(data),
                "update_time": beijing_now().strftime("%Y-%m-%d %H:%M:%S"),
                "subscribe_info": {
                    "can_subscribe_now": is_trade_time(),
                    "period": "交易日 9:30-11:30、13:00-15:00（法定节假日除外）",
                    "state": "当前可申购" if is_trade_time() else "非交易时间，暂不可申购",
                },
                "data": data,
            }
        )
    except Exception as e:
        return jsonify({"ok": False, "error": str(e), "data": []})


@app.route("/api/refresh")
def api_refresh():
    """强制清空缓存，重新拉取数据（后台进行，立即返回，避免请求卡死）。"""
    old = _CACHE["data"]
    _CACHE["data"] = None
    _CACHE["time"] = 0
    threading.Thread(target=_background_refresh, daemon=True).start()
    # 返回清空前的旧数据，保证前端立刻有内容；后台刷新完成后自动刷新会补齐
    return jsonify(
        {
            "ok": True,
            "count": len(old or []),
            "update_time": beijing_now().strftime("%Y-%m-%d %H:%M:%S"),
            "subscribe_info": {
                "can_subscribe_now": is_trade_time(),
                "period": "交易日 9:30-11:30、13:00-15:00（法定节假日除外）",
                "state": "当前可申购" if is_trade_time() else "非交易时间，暂不可申购",
            },
            "data": old or [],
        }
    )


@app.route("/api/subscribe")
def api_subscribe():
    """返回 {基金代码: 申购状态} 映射，供前端异步填充“申购状态”列。"""
    try:
        return jsonify({"ok": True, "data": get_subscribe_map()})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e), "data": {}})


@app.route("/api/alert_config", methods=["GET"])
def api_alert_config_get():
    """返回指定链接下「当前成员(owner)」自己的配置；members_count 为该链接已配置人数。"""
    key = request.args.get("u") or ""
    owner = request.args.get("owner") or ""
    cfg = get_user_alert(key)
    m = cfg["members"].get(owner, {"enabled": False, "threshold": 8.0, "targets": []})
    return jsonify({
        "ok": True,
        "config": {
            "enabled": m.get("enabled", False),
            "threshold": m.get("threshold", 8.0),
            "targets": m.get("targets", []),
            "members_count": len(cfg["members"]),
        },
    })


@app.route("/api/alert_config", methods=["POST"])
def api_alert_config_post():
    """保存指定链接下「当前成员(owner)」自己的配置，只更新该成员，不影响其他成员（合并而非覆盖）。"""
    key = request.args.get("u") or ""
    owner = request.args.get("owner") or "owner0"
    try:
        body = request.get_json(force=True, silent=True) or {}
        cfg = get_user_alert(key)
        members = cfg.setdefault("members", {})
        m = members.get(owner, {"enabled": False, "threshold": 8.0, "targets": []})
        m["enabled"] = bool(body.get("enabled", m.get("enabled", False)))
        try:
            m["threshold"] = float(body.get("threshold", m.get("threshold", 8)))
        except (TypeError, ValueError):
            pass
        # 多目标：从前端 targets 列表收集（过滤掉 webhook 为空的行）
        targets = []
        for t in (body.get("targets") or []):
            if isinstance(t, dict) and t.get("webhook"):
                targets.append({
                    "platform": t.get("platform", "dingtalk"),
                    "webhook": str(t["webhook"]).strip(),
                })
        m["targets"] = targets
        if m["targets"] or m["enabled"]:
            members[owner] = m
        else:
            members.pop(owner, None)   # 无目标且未启用 => 视为清空该成员
        set_user_alert(key, cfg)
        # 保存后立即检测一次（便于验证 Webhook 是否可用）
        threading.Thread(target=check_and_alert, args=(key,), daemon=True).start()
        return jsonify({
            "ok": True,
            "config": {
                "enabled": m["enabled"],
                "threshold": m["threshold"],
                "targets": m["targets"],
                "members_count": len(members),
            },
        })
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)})


if __name__ == "__main__":
    import os as _os

    # 云平台（如 Render）会通过 PORT 环境变量告知监听端口，并需监听 0.0.0.0
    port = int(_os.environ.get("PORT", 5000))
    host = _os.environ.get("HOST", "0.0.0.0")
    is_cloud = bool(_os.environ.get("PORT")) or _os.environ.get("RENDER") is not None

    # 启动前预热数据缓存：改为后台进行，避免冷启动阶段抓取耗时过长阻塞
    # app.run()，导致 Render 健康检查/首屏请求超时“无响应”。（接口本身已改为
    # 缓存优先、后台刷新，冷启动期间请求会立即返回并在数秒~数十秒内自动补齐。）
    try:
        threading.Thread(target=_background_refresh, daemon=True).start()
        print(" 数据缓存后台预热已启动（ETF/LOF 将在数秒~数十秒内就绪）。")
    except Exception:
        traceback.print_exc()

    # 启动提醒后台扫描线程（每 2 分钟检查一次开放申购且高溢价的 LOF）
    try:
        threading.Thread(target=_alert_scheduler, daemon=True).start()
        print(" 提醒扫描线程已启动。")
    except Exception:
        pass

    print("=" * 50)
    print(" 基金溢价率网站已启动！")
    print(f" 访问地址： http://{host}:{port}")
    if is_cloud:
        # 云端部署时不建立本地公网隧道（由平台提供公网地址）
        print(" 检测到云平台部署环境，使用平台提供的公网地址。")
        print("=" * 50)
        app.run(host=host, port=port, debug=False)
    else:
        print(" 正在尝试生成公网分享链接（Cloudflare Tunnel）…")
        print(" 关闭窗口即可停止网站。")
        print("=" * 50)
        try:
            # 用 flask_cloudflared 改写 app.run：调用 app.run 时会自动建立隧道，
            # 并在控制台打印一个公网 https 链接，可分享给别人访问。
            from flask_cloudflared import run_with_cloudflared
            run_with_cloudflared(app)
            app.run(host="127.0.0.1", port=5000, debug=False)
        except Exception as e:
            print(f"[提示] 未能生成公网链接（{e}），仅本机可用。")
            print(" 本机请访问： http://127.0.0.1:5000")
            app.run(host="127.0.0.1", port=5000, debug=False)
