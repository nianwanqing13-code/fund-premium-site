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

运行方式：
   双击 “启动网站.bat”，或在命令行执行：
   python app.py
然后浏览器打开：http://127.0.0.1:5000
"""

import time
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


if __name__ == "__main__":
    print("=" * 50)
    print(" 基金溢价率网站已启动！")
    print(" 本机访问： http://127.0.0.1:5000")
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
