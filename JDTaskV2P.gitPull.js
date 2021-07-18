/*
1.8小时拉一次库更新
2.加入自定义通知...到机器人
*/

console.log("✅  开始git pull更新库文件");

//CenBoMin/JDTASK_V2P
$exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P && git pull origin main:CenBoMin && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
  cwd: 'script/JSFile/JDTASK_V2P',
  timeout: 0,
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})

//smiek2221/scripts
$exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/smiek2221/scripts && git pull origin master:smiek2221 && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
  cwd: 'script/JSFile/scripts',
  timeout: 0,
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})

//shufflewzc/faker2
$exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/shufflewzc/faker2 && git pull origin main:faker2 && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
  cwd: 'script/JSFile/faker2',
  timeout: 0,
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})

//JDHelloWorld/jd_scripts
$exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts && git pull origin main:JDHelloWorld && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
  cwd: 'script/JSFile/jd_scripts',
  timeout: 0,
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})

//Aaron-lv/sync
$exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/Aaron-lv/sync && git pull origin jd_scripts:Aaron-lv && git log --pretty=format:"%h - %an, %ar : %s" --since=7.day', {
  cwd: 'script/JSFile/sync',
  timeout: 0,
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})
