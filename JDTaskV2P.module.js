// @grant require
// @grant nodejs
moduleTask();
function moduleTask() {
  for (let i = 0; i < 8; i++) {
    (function (i) {
      setTimeout(function () {
        if (i == 0) {
          console.log("⏳ 下载最新的模块文件:module.sh");
          $download('https://ghproxy.com/https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/module.sh', {
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
          $message.success("❗️请观察任务运行日志:JDTASKV2P模块安装完成\n👉 点击消息可打开程序运行日志(请刷新)",{ secd: 0, url: `${__home}/logs/${__name.replace(/\//,"-")}.log` })
          $message.loading("[Tip]模块安装完成请刷新,测试扫码！\n如果有问题请尝试到setting=>初始化相关设置=>重启elecV2P", 0)
        }
      },(i + 1) * 4000);
    })(i);
  }
}
