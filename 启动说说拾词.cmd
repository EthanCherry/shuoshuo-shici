@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 说说拾词 · 局域网服务
echo ============================================
echo   说说拾词 · 粤语/英语双语对话 + 词汇积累
echo ============================================
echo.
echo 启动后：本机浏览器打开 http://localhost:4173
echo 手机连同一 Wi-Fi，打开下方显示的局域网地址。
echo 关闭此窗口即停止服务。
echo.
node server.mjs
pause