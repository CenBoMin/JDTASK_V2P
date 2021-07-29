// @grant require;
// @grant nodejs;
/*
此文件为Node.js &elecV2P专用。其他用户请忽略
使用V2P函数$store处理进度cookie,并存储一个cookie值作为V2P执行的环境变量JD_COOKIE

CookiesJDV2P值成功保存→script/Shell/JDCookies.txt，文件用于py脚本
*/
const fs = require('fs')

///////////////////////////////
let CookiesJD = $store.get('CookiesJD', 'array')
let CookieJD = $store.get('CookieJD', 'string')
let CookieJD2 = $store.get('CookieJD2', 'string')
let CookiesJDV2P = $store.get('CookiesJDV2P', 'string')
let CookiesJDCARV2P = $store.get('CookiesJDCARV2P', 'string')

///////////////////////////////公平上车助力CookiesJDCARV2P,每天推送10个人往前的位置
if (CookiesJDCARV2P) {
  const CookiesJDV2P = $store.get('CookiesJDCARV2P', 'string')
  const cookieList = CookiesJDV2P.split("&")
  let cookieBackArr = cookieList.slice(0,10)
  let cookieFrontArr = cookieList.slice(10)

  //数组合并
  for (var i = 0; i < cookieBackArr.length; i++) {
    let Arrcode = cookieBackArr[i]
    cookieFrontArr.push(Arrcode)
  }

  const cookieCar = cookieFrontArr.join("&");
  $store.put(cookieCar, 'CookiesJDCARV2P', 'string') ? console.log("🌟 CookiesJDCARV2P转换成功！请到store/cookie 常量储存管理查看") : console.log("CookiesJDCARV2P转换失败！❌");

} else {
  const CookiesJDV2P = $store.get('CookiesJDV2P', 'string')
  const cookieList = CookiesJDV2P.split("&")
  let cookieBackArr = cookieList.slice(0,5)
  let cookieFrontArr = cookieList.slice(5)

  //数组合并
  for (var i = 0; i < cookieBackArr.length; i++) {
    let Arrcode = cookieBackArr[i]
    cookieFrontArr.push(Arrcode)
  }

  const cookieCar = cookieFrontArr.join("&");
  $store.put(cookieCar, 'CookiesJDCARV2P', 'string') ? console.log("🌟 CookiesJDCARV2P转换成功！请到store/cookie 常量储存管理查看") : console.log("CookiesJDCARV2P转换失败！❌");
}
/////////////////////////////// 定时更新执行任务的cookie值：CookiesJDV2P
if (CookiesJD && CookieJD && CookieJD2) {
  const CookiesJDList = CookiesJD.map(item => item.cookie)
  CookiesJDList.unshift(CookieJD2);
  CookiesJDList.unshift(CookieJD);
  const cookieV2P1 = CookiesJDList.join("&");
  $store.put(cookieV2P1, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！请到store/cookie 常量储存管理查看") : console.log("CookiesJDV2P转换失败！❌");
}else if (CookiesJD) {
  const CookiesJDList = CookiesJD.map(item => item.cookie)
  const cookieV2P1 = CookiesJDList.join("&");
  $store.put(cookieV2P1, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！请到store/cookie 常量储存管理查看") : console.log("CookiesJDV2P转换失败！❌");

} else {
  if (CookieJD2) {
    const CookiesJDList = new Array();
    CookiesJDList.unshift(CookieJD2);
    CookiesJDList.unshift(CookieJD);
    const cookieV2P2 = CookiesJDList.join("&");
    $store.put(cookieV2P2, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！请到store/cookie 常量储存管理查看") : console.log("CookiesJDV2P转换失败！❌");
  } else {
    $store.put(CookieJD, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！请到store/cookie 常量储存管理查看") : console.log("CookiesJDV2P转换失败！❌");
  }
}

/////////////////////////////// Python脚本:JDCookies.txt文件生成
if (CookiesJDV2P) {
  const content = CookiesJDV2P.split("&").join("\n");

  fs.writeFile('/usr/local/app/script/Shell/JDCookies.txt', content, err => {
    if (err) {
      console.error(err)
      return
    }else {
      console.log("🌟 CookiesJDV2P值成功！已保存到script/Shell/JDCookies.txt");
    }
    //文件写入成功。
  })
/////////////////////////////// 助力任务的环境变量：PtPinJDV2P_PY &PtPinJDV2P
  const ptpinList = new Array();
  const CookiesJDV2PList =  CookiesJDV2P.split("&");
  for (let i = 0; i < CookiesJDV2PList.length; i++) {
    ptpinList.push(CookiesJDV2PList[i].split(";")[1].replace(/pt_pin=/,""))
  }
  const ptpinsValue = ptpinList.join("&");

  $store.put(ptpinsValue, 'PtPinJDV2P', 'string') ? console.log("🌟 PtPinJDV2P转换成功！请到store/cookie 常量储存管理查看") : console.log("PtPinJDV2P转换失败！❌");

  $store.put(ptpinList, 'PtPinJDV2P_PY', 'string') ? console.log("🌟 PtPinJDV2P_PY转换成功！请到store/cookie 常量储存管理查看") : console.log("PtPinJDV2P_PY转换失败！❌");

}
