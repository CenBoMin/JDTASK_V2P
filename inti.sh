#!/bin/sh
apk update
echo "ð å¼å§å®è£[git]";
apk add git
echo "â [git]å®è£å®æ";

echo "ð [gitpull]:å¼å§ä¸è½½åºæä»¶";
rm -rf JDTASK_V2P && rm -rf jd_scripts && rm -rf faker2 && rm -rf sync && rm -rf scripts

echo "ð [gitclone]:Aaron-lv/sync";
git clone -b jd_scripts https://github.com/Aaron-lv/sync

echo "ð [gitclone]:smiek2221/scripts";
git clone https://github.com/smiek2221/scripts

echo "ð [gitclone]:shufflewzc/faker2";
git clone https://github.com/shufflewzc/faker2

echo "ð [gitclone]:JDHelloWorld/jd_scripts";
git clone https://github.com/JDHelloWorld/jd_scripts

echo "ð [gitclone]:CenBoMin/JDTASK_V2P";
git clone https://github.com/CenBoMin/JDTASK_V2P

echo "â æ­åï¼JDTASKV2Pèæ¬gitcloneå®æ ð ";
