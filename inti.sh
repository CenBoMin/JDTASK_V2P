#!/bin/sh
echo "🤖 开始安装[git]";
apk add git
echo "🤖 [git]安装完成";
echo "🤖 [gitclone]:JDHelloWorld/jd_scripts 拉库中...";
git clone https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts
echo "🤖 [gitclone]:CenBoMin/JDTASK_V2P 拉库中...";
git clone https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P
