# 场内基金溢价率网站

一个用来计算**场内基金（ETF / LOF）溢价率**并排行展示的小网站。

- 溢价率 =（当日市价 − 当日预估净值 IOPV）÷ 预估净值 × 100%
- 正数 = 溢价（红，可考虑卖出/赎回套利）
- 负数 = 折价（绿，可考虑买入套利）
- 数据来源：[AKShare](https://github.com/akfamily/akshare)（东方财富），免费开源
- 页面默认每 60 秒自动刷新
- 支持按代码/名称搜索、按类型筛选、套利机会筛选与高亮
- 通过 Cloudflare Tunnel 一键生成公网链接，可分享给别人访问

---

## 一、别人怎么部署（最简单，Windows）

1. 安装 Python 3.9~3.12：https://www.python.org/downloads/
   **安装时务必勾选 "Add Python to PATH"**。
2. 把整个 `fund_premium_site` 文件夹发给对方（或下载解压）。
3. **双击 `启动网站.bat`**：
   - 首次会自动安装依赖（需联网，约 1~2 分钟）；
   - 启动后浏览器打开 http://127.0.0.1:5000 即可使用；
   - 控制台会打印一个 `https://xxxx.trycloudflare.com` 链接，发给朋友即可在外网访问。
4. 关闭那个黑色窗口即停止网站。

> 注意：使用期间**请关闭系统代理 / VPN**，否则数据源可能连不上。

---

## 二、手动部署（命令行，Windows / macOS / Linux 通用）

```bash
# 1. 进入项目目录
cd fund_premium_site

# 2. 建议先建虚拟环境（可选）
python -m venv venv
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# 3. 安装依赖
pip install -r requirements.txt

# 4. 启动
python app.py
```

启动后访问 http://127.0.0.1:5000

---

## 三、文件说明

| 文件 | 作用 |
|------|------|
| `app.py` | 后端：从 AKShare 取数、计算溢价率、提供网页与接口、建立公网隧道 |
| `templates/index.html` | 前端网页：表格展示、排序、搜索、筛选、自动刷新 |
| `requirements.txt` | Python 依赖清单 |
| `启动网站.bat` | Windows 一键启动脚本（自动装依赖） |
| `README.md` | 本说明 |

---

## 四、常见问题

**Q：页面一直"加载中"或报错？**
A：多半是开了代理/VPN。关掉系统代理后刷新即可。数据源（东方财富）需要直连。

**Q：公网链接打不开？**
A：Cloudflare 临时隧道每次重启都会变；且必须保持你的电脑开机、网站在运行、代理关闭。

**Q：想要固定不变的域名？**
A：注册免费 Cloudflare 账号，用 `cloudflared tunnel` 配置固定隧道，再在 `app.py` 里改用
`run_with_cloudflared(app, tunnel_id="你的隧道ID")` 即可。

**Q：数据多久更新？**
A：网页每 60 秒自动刷新一次；后端对数据源有 60 秒缓存，点"刷新数据"可立即拉取最新。

---

## 五、免责声明

本工具仅供学习与个人参考，数据来自第三方公开接口，可能存在延迟或误差。
**不构成任何投资建议**。基金套利涉及交易费用、时间差与价格波动风险，请自行核实并谨慎决策。
