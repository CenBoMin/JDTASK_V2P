// @grant require
// @grant nodejs
//============================
$message.loading("JDTASKV2P初始化开始", 2)
//============================

$exec('chmod +x ./inti.sh', {
  cwd: 'script/JSFile/JDTASK_V2P',
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})

$exec('./inti.sh', {
  cwd: 'script/JSFile/JDTASK_V2P',
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})

//============================
//下载需要的环境变量文件：sendNotify.js && jdCookie.js && JS_USER_AGENTS.js &&
//https://raw.githubusercontent.com/JDHelloWorld/jd_scripts/main/JS_USER_AGENTS.js
//============================
