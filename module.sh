#!/bin/sh
echo "🤖 开始安装[inti-Module]";
npm install request
npm install ws
npm install qrcode-terminal
npm install http-server
echo "✅ [inti-Module]安装完成";

echo "🤖 开始安装[Node-Module]";
npm install png-js
npm install got
npm install tunnel
npm install crypto-js
npm install download
npm install tough-cookie
echo "✅ [Node-Module]安装完成";

echo "🤖 开始更新[NPM]";
npm update
npm upgrade
echo "✅ [Node-Module]安装完成";
echo "✅ 恭喜！JDTASKV2P模块安装完成,PM2重启elecV2P 🎉 ";
echo "\n\n🤖 pm2 restart elecV2P...";
pm2 restart elecV2P
