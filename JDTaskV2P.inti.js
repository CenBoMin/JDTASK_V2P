// @grant require
// @grant nodejs

$message.loading("JDTASKV2P初始化开始", 2)

$exec('chmod +x ./jdtaskinti.sh', {
  cwd: 'script/JSFile',
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})

$exec('./jdtaskinti.sh', {
  cwd: 'script/JSFile',
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})


//============================
//安装执行脚本的依赖:
//============================
// png-js
// got


//============================
//gitclone基本数据库
//git clone https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts
//git clone https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P
//============================



//============================
//下载需要的环境变量文件：sendNotify.js && jdCookie.js && JS_USER_AGENTS.js &&
//https://raw.githubusercontent.com/JDHelloWorld/jd_scripts/main/JS_USER_AGENTS.js
//============================
