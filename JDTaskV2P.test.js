// @grant require
// @grant nodejs
//============================
$message.loading("【 JDTASKV2P测试 】", 2)
//============================

testModule();
function testModule() {
  try {
    require('png-js')
  } catch (e) {
    if (typeof e === "object") {
      console.log("adasdsadas-js未安装");
    }
  } finally {
    console.log("adasdsadas-js安装ok!")
  }  
}


//下载module.sh到script/JSFile
// testTask();
// function testTask() {
//   for (let i = 0; i < 8; i++) {
//     (function (i) {
//       setTimeout(function () {
//         if (i == 0) {
//
//         }else if (i == 1) {
//
//         }else if (i == 2) {
//           //1
//           $message.loading("⏳ 下载模块文件:test.sh", 2)
//           $download('https://ghproxy.com/https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/test.sh', {
//             folder: './script/JSFile',
//             name: 'module.sh'
//           }).then(d=> $message.success("✅  test.sh已下载script/JSFile", 5)).catch(e=>console.error(e))
//           //2
//           $message.loading("⏳ 任务准备安装中...", 5)
//           $exec('chmod +x ./test.sh', {
//             cwd: 'script/JSFile',
//             cb(data, error) {
//               error ? console.error(error) : console.log(data)
//             }
//           })
//           //3
//           $message.loading("⏳ 开始安装...请稍等片刻(第一次大约10分钟)", 5)
//           $exec('./test.sh', {
//             cwd: 'script/JSFile',timeout: 0,
//             cb(data, error) {
//               error ? console.error(error) : console.log(data)
//             }
//           })
//
//         }else if (i == 6) {
//
//           // $message.success("❗️请观察任务运行日志:JDTASKV2P模块安装完成\n👉 点击消息可打开程序运行日志(请刷新)",{ secd: 0, url: `${__home}/logs/${__name.replace(/\//,"-")}.log` })
//           //
//           // $message.loading("[Tip]模块安装完成请刷新,测试扫码！\n如果有问题请尝试到setting=>初始化相关设置=>重启elecV2P", 0)
//
//         }
//       },(i + 1) * 4000);
//     })(i);
//   }
// }



// checkCmd('npm list lion-lib-jssssss').then(data => console.log(data, "安装完成")).catc(e => {
//   "未安装"
// })



// $exec('cnpm list lion-lib-jssssss', {
//   timeout: 0,
//   cb(data, error) {
//     if (error) {
//       console.error(error)
//     } else {
//       console.log(typeof data)
//       console.log(`backdata：${data}`)
//     }
//   }
// })
