//8小时拉一次库更新

//CenBoMin/JDTASK_V2P
$exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=3.day', {
  cwd: 'script/JSFile/JDTASK_V2P', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

//JDHelloWorld/jd_scripts
$exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=3.day', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
