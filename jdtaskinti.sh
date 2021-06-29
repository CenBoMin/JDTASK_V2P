#!/bin/sh
cd JDTASK_V2P
git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=8.hour
