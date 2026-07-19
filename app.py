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
4. 展示每只基金的「申购状态」（开放申购 / 暂停申购）与「申购时间」。

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
import traceback
from concurrent.futures import ThreadPoolExecutor

import akshare as ak
import pandas as pd
from flask import Flask, jsonify, render_template

# ETF / LOF 并行获取，LOF 连不上时最多等这么久，避免拖垮整页
_LOF_TIMEOUT = 12

app = Flask(__name__)

# ---------------------------------------------------------------------------
# 简单的内存缓存：避免频繁请求数据源被限制，默认缓存 60 秒
# ---------------------------------------------------------------------------
_CACHE = {"data": None, "time": 0}
_CACHE_SECONDS = 60


def is_trade_time():
    """判断当前是否处于基金场内交易 / 申购时段（周一~周五 9:30-11:30、13:00-15:00）。"""
    now = datetime.datetime.now()
    if now.weekday() >= 5:          # 5=周六, 6=周日
        return False
    t = now.time()
    morning = datetime.time(9, 30) <= t <= datetime.time(11, 30)
    afternoon = datetime.time(13, 0) <= t <= datetime.time(15, 0)
    return morning or afternoon


# ---------------------------------------------------------------------------
# 基金申购状态（开放申购 / 暂停申购）：来自 AKShare 开放式基金列表，独立缓存，
# 失败时不影响主溢价数据。ETF / LOF 的 6 位代码一般都能在该列表匹配到，
# 匹配不到则前端显示“-”。
# ---------------------------------------------------------------------------
_SUBSCRIBE_CACHE = {"map": None, "time": 0}
_SUBSCRIBE_TTL = 600  # 10 分钟


def _normalize_subscribe_status(raw):
    """把数据源返回的原始申购状态字符串标准化为可展示的中文标签。

    参考业界做法（如 arbitrage-alert）：按关键字匹配「暂停 / 限 / 开放」。
    - 含“暂停” -> 暂停申购（不可申购）
    - 含“限”   -> 限大额（可申购但限额）
    - 含“开放” -> 开放申购（正常可申购）
    - 空 / NaN  -> 空串（前端显示“-”）
    """
    if raw is None:
        return ""
    s = str(raw).strip()
    if s in ("", "nan", "None"):
        return ""
    if "暂停" in s:
        return "暂停申购"
    if "限" in s:
        return "限大额"
    if "开放" in s:
        return "开放申购"
    return s


def get_subscribe_map():
    """返回 {基金代码: 申购状态} 映射，带缓存。"""
    global _SUBSCRIBE_CACHE
    now = time.time()
    if _SUBSCRIBE_CACHE["map"] is not None and (now - _SUBSCRIBE_CACHE["time"] < _SUBSCRIBE_TTL):
        return _SUBSCRIBE_CACHE["map"]
    try:
        df = ak.fund_open_fund_info_em()
        col = None
        for c in ["申购状态", "申购", "开放申购"]:
            if c in df.columns:
                col = c
                break
        m = {}
        if col:
            for _, row in df.iterrows():
                code = str(row.get("基金代码", "")).strip()
                if code:
                    m[code] = _normalize_subscribe_status(row.get(col, ""))
        _SUBSCRIBE_CACHE["map"] = m
        _SUBSCRIBE_CACHE["time"] = now
        return m
    except Exception:
        traceback.print_exc()
        # 获取失败时，若已有旧缓存就继续用旧数据，否则返回空映射
        if _SUBSCRIBE_CACHE["map"] is None:
            _SUBSCRIBE_CACHE["map"] = {}
        return _SUBSCRIBE_CACHE["map"]


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
            iopv = _to_float(row.get("IOPV实时估值"))

            # 没有市价或没有预估净值、或净值<=0 的，无法计算溢价率，跳过
            if price is None or iopv is None or iopv <= 0:
                continue

            premium = (price - iopv) / iopv * 100.0

            records.append(
                {
                    "code": str(row.get("代码", "")).strip(),
                    "name": str(row.get("名称", "")).strip(),
                    "type": fund_type,
                    "price": round(price, 4),          # 当日市价
                    "iopv": round(iopv, 4),            # 当日预估净值
                    "premium": round(premium, 3),      # 溢价率(%)
                    "change_pct": _to_float(row.get("涨跌幅")),  # 当日涨跌幅(%)
                }
            )
    except Exception:
        # 打印错误方便排查，但不影响其它类型基金
        print(f"[警告] 获取 {fund_type} 数据失败：")
        traceback.print_exc()
    return records


def get_fund_premium():
    """获取全部场内基金的溢价率数据（带缓存）。"""
    now = time.time()
    if _CACHE["data"] is not None and (now - _CACHE["time"] < _CACHE_SECONDS):
        return _CACHE["data"]

    all_records = []

    # ETF 与 LOF 并行获取：LOF 连不上时最多等 _LOF_TIMEOUT 秒，
    # 避免它长时间重试把整页拖垮，ETF 数据始终能正常返回。
    with ThreadPoolExecutor(max_workers=2) as pool:
        f_etf = pool.submit(_fetch_one, "ETF", ak.fund_etf_spot_em)
        f_lof = pool.submit(_fetch_one, "LOF", ak.fund_lof_spot_em)
        all_records += f_etf.result()              # ETF 一般很快
        try:
            all_records += f_lof.result(_LOF_TIMEOUT)
        except Exception:
            print("[提示] LOF 数据获取超时，本次仅展示 ETF。")

    # 默认按溢价率从高到低排序
    all_records.sort(key=lambda x: x["premium"], reverse=True)

    _CACHE["data"] = all_records
    _CACHE["time"] = now
    return all_records


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
                "update_time": time.strftime("%Y-%m-%d %H:%M:%S"),
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
    """强制清空缓存，重新拉取数据。"""
    _CACHE["data"] = None
    _CACHE["time"] = 0
    return api_premium()


@app.route("/api/subscribe")
def api_subscribe():
    """返回 {基金代码: 申购状态} 映射，供前端异步填充“申购状态”列。"""
    try:
        return jsonify({"ok": True, "data": get_subscribe_map()})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e), "data": {}})


if __name__ == "__main__":
    import os as _os

    # 云平台（如 Render）会通过 PORT 环境变量告知监听端口，并需监听 0.0.0.0
    port = int(_os.environ.get("PORT", 5000))
    host = _os.environ.get("HOST", "0.0.0.0")
    is_cloud = bool(_os.environ.get("PORT")) or _os.environ.get("RENDER") is not None

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
