#!/bin/sh
apk update
echo "🌟 开始安装[git]";
apk add git
echo "✅ [git]安装完成";

echo "🌟 [gitpull]:开始下载库文件";
rm -rf JDTASK_V2P && rm -rf jd_scripts && rm -rf faker2 && rm -rf sync && rm -rf scripts

echo "🌟 [gitclone]:Aaron-lv/sync";
git clone -b jd_scripts https://github.com/Aaron-lv/sync

echo "🌟 [gitclone]:smiek2221/scripts";
git clone https://github.com/smiek2221/scripts

echo "🌟 [gitclone]:shufflewzc/faker2";
git clone https://github.com/shufflewzc/faker2

echo "🌟 [gitclone]:JDHelloWorld/jd_scripts";
git clone https://github.com/JDHelloWorld/jd_scripts

echo "🌟 [gitclone]:CenBoMin/JDTASK_V2P";
git clone https://github.com/CenBoMin/JDTASK_V2P

echo "✅ 恭喜！JDTASKV2P脚本初始化完成 🎉 ";
