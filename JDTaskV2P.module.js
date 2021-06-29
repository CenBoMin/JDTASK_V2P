// @grant require
// @grant nodejs
//============================
$message.loading("【 JDTASKV2P模块安装 】", 21)
//============================
$message.loading("🤖 使用国内镜像下载npm", 3)
$exec("npm config set /usr/local/app/script/JSFile/npm https://mirrors.huaweicloud.com/repository/npm", {
  cwd: 'script/JSFile',
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})

//下载module.sh到script/JSFile
moduleTask();
function moduleTask() {
  for (let i = 0; i < 8; i++) {
    (function (i) {
      setTimeout(function () {
        if (i == 0) {
          $message.loading("⏳ 下载模块文件:module.sh", 2)
          $download('https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/module.sh', {
            folder: './script/JSFile',
            name: 'module.sh'
          }).then(d=> $message.success("✅  module.sh已下载script/JSFile", 5)).catch(e=>console.error(e))
        }else if (i == 1) {
          $message.loading("⏳ 任务准备安装中...", 5)
          $exec('chmod +x ./module.sh', {
            cwd: 'script/JSFile',
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 2) {
          $message.loading("⏳ 开始安装...请稍等片刻(第一次大约10分钟)", 120)
          $exec('./module.sh', {
            cwd: 'script/JSFile',timeout: 0,
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 6) {
          $message.success("❗️请观察任务运行日志:JDTASKV2P模块安装完成\n👉 点击消息可打开程序运行日志",{ secd: 0, url: `${__home}/logs/${__name}.log` })
          $message.loading("如果模块安装完成！\n请到setting=>初始化相关设置=>重启elecV2P", 5)
        }
      },(i + 1) * 4000);
    })(i);
  }
}
