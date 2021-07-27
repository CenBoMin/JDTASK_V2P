// @grant require;
// @grant nodejs;
/*
此文件为Node.js &elecV2P专用。其他用户请忽略
使用V2P函数$store处理进度cookie,并存储一个cookie值作为V2P执行的环境变量JD_COOKIE
定时更新执行任务的cookie值：CookiesJDV2P
CookiesJDV2P值成功保存→script/Shell/JDCookies.txt，文件用于py脚本
*/
const fs = require('fs')

let CookiesJD = $store.get('CookiesJD', 'array')
let CookieJD = $store.get('CookieJD', 'string')
let CookieJD2 = $store.get('CookieJD2', 'string')
let CookiesJDV2P = $store.get('CookiesJDV2P', 'string')

if (CookiesJD) {
  const CookiesJDList = CookiesJD.map(item => item.cookie)
  CookiesJDList.unshift(CookieJD2);
  CookiesJDList.unshift(CookieJD);
  const cookieV2P1 = CookiesJDList.join("&");
  $store.put(cookieV2P1, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！🎉") : console.log("CookiesJDV2P转换失败！❌");
} else {
  if (CookieJD2) {
    const CookiesJDList = new Array();
    CookiesJDList.unshift(CookieJD2);
    CookiesJDList.unshift(CookieJD);
    const cookieV2P2 = CookiesJDList.join("&");
    $store.put(cookieV2P2, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！🎉") : console.log("CookiesJDV2P转换失败！❌");
  } else {
    $store.put(CookieJD, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！🎉") : console.log("CookiesJDV2P转换失败！❌");
  }
}


const content = CookiesJDV2P.split("&").join("\n");

fs.writeFile('/usr/local/app/script/Shell/JDCookies.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }else {
    console.log("🌟 CookiesJDV2P值成功保存→script/Shell/JDCookies.txt");
  }
  //文件写入成功。
})
