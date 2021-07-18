#!/bin/sh
apk update
echo "🌟 开始安装[git]";
apk add git
echo "✅ [git]安装完成";

rm -rf JDTASK_V2P && rm -rf jd_scripts && rm -rf faker2

echo "🌟 [gitclone]:Aaron-lv/sync";
git clone -b jd_scripts https://ghproxy.com/https://github.com/Aaron-lv/sync

echo "🌟 [gitclone]:smiek2221/scripts";
git clone https://ghproxy.com/https://github.com/smiek2221/scripts

echo "🌟 [gitclone]:shufflewzc/faker2";
git clone https://ghproxy.com/https://github.com/shufflewzc/faker2

echo "🌟 [gitclone]:JDHelloWorld/jd_scripts";
git clone https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts

echo "🌟 [gitclone]:CenBoMin/JDTASK_V2P";
git clone https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P

echo "🌟 [gitpull]:开始下载库文件";

# git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/smiek2221/scripts && git pull origin master:smiek2221 && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day
#
# git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts && git pull origin main:JDHelloWorld && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day
#
# git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P && git pull origin main:CenBoMin && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day
#
# git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/shufflewzc/faker2 && git pull origin main:faker2 && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day
#
# git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/Aaron-lv/sync && git pull origin jd_scripts:Aaron-lv && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day

echo "✅ 恭喜！JDTASKV2P拉库完成 🎉 ";
