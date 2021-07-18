#!/bin/sh

echo "🌟 [gitpull]:开始拉库更新文件";

git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/smiek2221/scripts && git pull origin master && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day

git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day

git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day

git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/shufflewzc/faker2 && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day

git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/Aaron-lv/sync && git pull origin jd_scripts && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day

echo "✅ 恭喜！JDTASKV2P拉库完成 🎉 ";
