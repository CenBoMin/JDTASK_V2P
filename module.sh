#!/bin/sh
echo "🤖 开始安装[png-js]";
npm install png-js
echo "✅ [png-js]安装完成";

echo "🤖 开始安装[got]";
npm install got
echo "✅[got]安装完成";

echo "🤖 开始安装[tunnel]";
npm install tunnel
echo "✅[tunnel]安装完成";

echo "🤖 开始安装[crypto-js]";
npm install crypto-js
echo "✅ [crypto-js]安装完成";

echo "🤖 开始安装[download]";
npm install download
echo "✅ [download]安装完成";

echo "🤖 开始安装[tough-cookie]";
npm install tough-cookie
echo "✅ [tough-cookie]安装完成";

npm update
npm upgrade
echo "✅ 恭喜！JDTASKV2P模块安装完成 🎉 ";
echo "🤖 pm2 restart elecV2P...";
pm2 restart elecV2P
