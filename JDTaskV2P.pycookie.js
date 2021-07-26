// @grant nodejs
const fs = require('fs')
let CookiesJDV2P = '';
if (process.env.JD_COOKIE) {
  CookiesJDV2P = process.env.JD_COOKIE;
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
