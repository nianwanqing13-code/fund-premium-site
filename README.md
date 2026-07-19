# 场内基金溢价率网站

> 一个用来计算**场内基金（ETF / LOF）溢价率**并排行展示的网站。
> 数据来源：[AKShare](https://github.com/akfamily/akshare)（东方财富公开行情），免费开源。
> 项目地址：https://github.com/nianwanqing13-code/fund-premium-site

## 这是什么

溢价率 =（当日市价 − 当日预估净值 IOPV）÷ 预估净值 × 100%

- 溢价率 **> 0**（红）：市价比净值贵，可能存在**卖出 / 赎回套利**机会
- 溢价率 **< 0**（绿）：市价比净值便宜，可能存在**买入套利**机会

网站功能：

- 实时拉取全市场 ETF / LOF 的市价与 IOPV，自动计算溢价率
- 默认按溢价率从高到低排序
- 支持按代码 / 名称搜索、按类型（ETF/LOF）筛选、套利机会筛选与高亮
- 页面默认每 60 秒自动刷新，也可手动「刷新数据」
- 本机运行时可一键生成 Cloudflare 临时公网链接，分享给别人访问

---

## 在线体验（部署到 Render，免费）

本项目是 Flask + Python，需要服务器端运行，**无法用 GitHub Pages 直接托管**。
推荐用 [Render](https://render.com) 免费部署，它会自动从本 GitHub 仓库拉取代码并运行：

1. 注册 / 登录 Render（可用 GitHub 账号直接授权）
2. 在 Render 控制台选择 **New → Blueprint**（或 New → Web Service）
3. 关联本仓库 `fund-premium-site`
4. 按提示确认即可——`render.yaml` 已配好构建与启动命令
5. 部署完成后，Render 会给出一个公网地址（形如 `https://fund-premium-site.onrender.com`）

> 免费版在无访问时会休眠，首次打开可能要等十几秒唤醒。
> AKShare 需要服务器能访问东方财富；Render 的服务器可直连，正常可用。

---

## 本地运行（Windows，最简单）

1. 安装 Python 3.9~3.12：https://www.python.org/downloads/
   **安装时务必勾选 "Add Python to PATH"**。
2. 进入项目目录，双击 **`启动网站.bat`**：
   - 首次自动安装依赖（需联网，约 1~2 分钟）
   - 启动后浏览器打开 http://127.0.0.1:5000
   - 控制台会打印一个 `https://xxxx.trycloudflare.com` 链接，发给朋友即可外网访问
3. 关闭黑色窗口即停止网站。

> 使用期间**请关闭系统代理 / VPN**，否则数据源可能连不上。

### 命令行运行（Windows / macOS / Linux 通用）

```bash
cd fund_premium_site
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows
pip install -r requirements.txt
python app.py
```

打开 http://127.0.0.1:5000

---

## 文件说明

| 文件 | 作用 |
|------|------|
| `app.py` | 后端：从 AKShare 取数、计算溢价率、提供网页与接口、可选建立公网隧道 |
| `templates/index.html` | 前端网页：表格展示、排序、搜索、筛选、自动刷新 |
| `requirements.txt` | Python 依赖清单（本地与部署共用） |
| `启动网站.bat` | Windows 一键启动脚本（自动装依赖） |
| `render.yaml` | Render 部署配置 |

---

## 接口

- `GET /`：网页
- `GET /api/premium`：返回全部基金溢价率 JSON（含申购时间提示）
- `GET /api/refresh`：强制刷新缓存后返回最新数据
- `GET /api/subscribe`：返回 `{基金代码: {label, amount, cls, amount_num}}` 申购状态与可申购数额映射（`amount_num` 为以元为单位的数值，供排序）

---

## 常见问题

**Q：页面一直"加载中"或报错？**
A：多半是开了代理 / VPN。关掉系统代理后刷新即可。数据源（东方财富）需要直连。

**Q：公网链接打不开？**
A：Cloudflare 临时隧道每次重启都会变；且必须保持你的电脑开机、网站在运行、代理关闭。
想要固定不变的域名，可注册免费 Cloudflare 账号，用 `cloudflared tunnel` 配置固定隧道。

**Q：数据多久更新？**
A：网页每 60 秒自动刷新；后端对数据源有 60 秒缓存，点"刷新数据"可立即拉取最新。

---

## 免责声明

本工具仅供学习与个人参考，数据来自第三方公开接口，可能存在延迟或误差。
**不构成任何投资建议**。基金套利涉及交易费用、时间差与价格波动风险，请自行核实并谨慎决策。
