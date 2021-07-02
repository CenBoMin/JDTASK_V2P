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
          }).then(d=> console.log("✅  module.sh已下载script/JSFile")).catch(e=>console.error(e))
        }else if (i == 1) {
          console.log("⏳ 任务准备安装中...")
          $exec('chmod +x ./module.sh', {
            cwd: 'script/JSFile',
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 2) {
          console.log("⏳ 开始安装...请稍等片刻")
          $exec('./module.sh', {
            cwd: 'script/JSFile',timeout: 0,
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 6) {
          console.log("❗️请观察任务运行日志:JDTASKV2P模块安装完成");
        }
      },(i + 1) * 4000);
    })(i);
  }
}
