@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ============================================================
echo   基金溢价率网站 —— 启动脚本
echo ============================================================

:: 1) 找到 C:\Users\Lenovo\Desktop\Python311\python.exe 命令（兼容系统 Python / 虚拟环境）
where C:\Users\Lenovo\Desktop\Python311\python.exe >nul 2>nul
if errorlevel 1 (
    echo [错误] 没有找到 C:\Users\Lenovo\Desktop\Python311\python.exe。请先安装 Python 3.9~3.12：
    echo   官网 https://www.C:\Users\Lenovo\Desktop\Python311\python.exe.org/downloads/
    echo   安装时务必勾选 "Add Python to PATH"。
    pause
    exit /b 1
)

echo [1/3] 检查并安装依赖（首次较慢）...
C:\Users\Lenovo\Desktop\Python311\python.exe -m pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple --quiet
if errorlevel 1 (
    echo [警告] 依赖安装失败，尝试用官方源重试...
    C:\Users\Lenovo\Desktop\Python311\python.exe -m pip install -r requirements.txt --quiet
)

echo [1.5/3] 尝试安装公网隧道组件（可选，失败不影响本机使用）...
C:\Users\Lenovo\Desktop\Python311\python.exe -m pip install flask-cloudflared --quiet 2>nul || echo [提示] 跳过隧道组件，仅本机可用。

echo [2/3] 启动网站...
echo.
echo   本机访问: http://127.0.0.1:5000
echo   启动后控制台会打印一个 https://*.trycloudflare.com 链接，
echo   把该链接发给别人，对方即可在外网访问（需保持本机开机、代理关闭）。
echo   关闭本窗口即可停止网站。
echo.
C:\Users\Lenovo\Desktop\Python311\python.exe app.py
pause
