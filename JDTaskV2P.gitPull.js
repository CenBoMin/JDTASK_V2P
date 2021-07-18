/*
1.8小时拉一次库更新
2.加入自定义通知...到机器人

*/
gitpullTask();
function gitpullTask() {
  for (let i = 0; i < 8; i++) {
    (function (i) {
      setTimeout(function () {
        if (i == 0) {
          // $message.loading("⏳ 下载初始化文件:inti.sh", 2)
          $download('https://ghproxy.com/https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/inti.sh', {
            folder: './script/JSFile',
            name: 'inti.sh'
          }).then(d=> $message.success("✅  inti.sh已下载script/JSFile", 5)).catch(e=>console.error(e))
        }else if (i == 1) {
          // $message.loading("⏳ 初始化任务准备安装中...", 5)
          $exec('chmod +x ./inti.sh', {
            cwd: 'script/JSFile',
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 2) {
          // $message.loading("⏳ 开始安装...请稍等片刻", 5)
          $exec('./inti.sh', {
            cwd: 'script/JSFile',timeout: 0,
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 15) {
          //CenBoMin/JDTASK_V2P
          $exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
            cwd: 'script/JSFile/JDTASK_V2P', timeout: 0,
            cb(data, error){
              error ? console.error(error) : console.log(data)
            }
          })

          //Aaron-lv/jd_scripts
          $exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/Aaron-lv/sync && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
            cwd: 'script/JSFile/jd_scripts', timeout: 0,
            cb(data, error){
              error ? console.error(error) : console.log(data)
            }
          })

          //shufflewzc/jd_scripts
          $exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/shufflewzc/faker2 && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
            cwd: 'script/JSFile/faker2', timeout: 0,
            cb(data, error){
              error ? console.error(error) : console.log(data)
            }
          })

          //JDHelloWorld/jd_scripts
          $exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts && git pull origin main && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
            cwd: 'script/JSFile/jd_scripts', timeout: 0,
            cb(data, error){
              error ? console.error(error) : console.log(data)
            }
          })

        }
      },(i + 1) * 4000);
    })(i);
  }
}
