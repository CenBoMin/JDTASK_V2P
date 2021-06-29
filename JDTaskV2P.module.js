// @grant require
// @grant nodejs
//============================
$message.loading("开始安装JDTASKV2P模块", 2)
//============================
//下载inti.sh到script/JSFile
moduleTask();
function moduleTask() {
  for (let i = 0; i < 4; i++) {
    (function (i) {
      setTimeout(function () {
        if (i == 0) {
          $message.loading("⏳ 下载模块文件:module.sh", 2)
          $download('https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/module.sh', {
            folder: './script/JSFile',
            name: 'module.sh'
          }).then(d=> $message.success("✅ module.sh已下载script/JSFile", 5)).catch(e=>console.error(e))
        }else if (i == 1) {
          $message.loading("⏳ 初始化任务准备安装中...", 5)
          $exec('chmod +x ./module.sh', {
            cwd: 'script/JSFile',
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 2) {
          $message.loading("⏳ 开始安装...请稍等片刻", 5)
          $exec('./module.sh', {
            cwd: 'script/JSFile',timeout: 0,
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 3) {
          $message.success("恭喜！JDTASKV2P模块安装完成 🎉", 3)
        }
      },(i + 1) * 4000);
    })(i);
  }
}
