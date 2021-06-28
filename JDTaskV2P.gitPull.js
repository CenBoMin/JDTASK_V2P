//8小时拉一次库更新

//CenBoMin/JDTASK_V2P
$exec('cd JDTASK_V2P && git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=8.hour
', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

//JDHelloWorld/jd_scripts
$exec('cd jd_scripts && git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=8.hour
', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
