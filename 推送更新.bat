@echo off
chcp 65001 >nul
cd /d %~dp0
echo 正在推送到 GitHub（会弹出浏览器，请用你的 GitHub 账号登录授权）...
git push -u origin main
echo.
echo 推送完成。如果弹出浏览器，请登录并点击 Authorize 授权。
echo 之后去 https://fund-premium-site.onrender.com 查看更新（Render 会自动重新部署，首次可能要等几分钟）。
pause
