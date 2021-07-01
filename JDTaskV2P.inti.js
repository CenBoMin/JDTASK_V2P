// @grant require
// @grant nodejs
//============================
$message.loading("【 JDTASKV2P初始化 】", 25)
//============================
$message.loading("🤖 使用国内镜像下载Alpine Linux包管理工具apk", 3)

$exec("sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories", {
  cwd: 'script/JSFile',
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})
//下载inti.sh到script/JSFile
intiTask();
function intiTask() {
  for (let i = 0; i < 8; i++) {
    (function (i) {
      setTimeout(function () {
        if (i == 0) {
          $message.loading("⏳ 下载初始化文件:inti.sh", 2)
          $download('https://ghproxy.com/https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/inti.sh', {
            folder: './script/JSFile',
            name: 'inti.sh'
          }).then(d=> $message.success("✅  inti.sh已下载script/JSFile", 5)).catch(e=>console.error(e))
        }else if (i == 1) {
          $message.loading("⏳ 初始化任务准备安装中...", 5)
          $exec('chmod +x ./inti.sh', {
            cwd: 'script/JSFile',
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 2) {
          $message.loading("⏳ 开始安装...请稍等片刻", 5)
          $exec('./inti.sh', {
            cwd: 'script/JSFile',timeout: 0,
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 7) {
          $message.success("JDTASKV2P初始化完成 🎉 \n👉 点击消息可打开程序运行日志",{ secd: 0, url: `${__home}/logs/${__name.replace(/\//,"-")}.log` })
        }
      },(i + 1) * 4000);
    })(i);
  }
}

// 在 Docker 下安装 python 执行环境
// 远程地址: https://raw.githubusercontent.com/elecV2/elecV2P/master/script/JSFile/python-install.js
checkCmd('python3 -V').then(data=>console.log(data, "✅ [python3]安装完成")).catc(e=>{
  // 开始安装 python
  console.log("🤖 开始安装[python3]");
  $exec('apk add python3 py3-pip', {
    call: true, timeout: 0,
    cb(data, error, finish){
      error ? console.error(error) : console.log(data)
      // if (!error && finish) {
      //   // 安装一些 python 库，根据需要自行选择更改
      //   // $exec('pip3 install you-get requests', { cb(data, error){error ? console.error(error) : console.log(data)} })
      //
      //   // python 和库安装完成后可直接在系统或其他脚本中调用，不需要再次安装
      //   // 下面这段代码可在新的脚本中单独运行
      //   // $exec('python3 -u test.py', {
      //   //   cwd: './script/Shell',    // test.py 所在目录（其他文件可通过 EFSS 文件管理界面进行上传
      //   //   cb(data, error){
      //   //     error ? console.error(error) : console.log(data)
      //   //   }
      //   // })
      // } else {
      //   error ? console.error(error) : console.log(data)
      // }
    }
  })
})
function checkCmd(cmd) {
  return new Promise((resolve, reject)=>{
    $exec(cmd, {
      timeout: 0,
      cb(data, error){
        if (error) {
          console.error(error)
          reject(error.message || error)
        } else {
          console.log(data)
          resolve()
        }
      }
    })
  })
}
