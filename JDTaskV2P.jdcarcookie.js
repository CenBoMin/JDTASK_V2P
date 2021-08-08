// @grant require
// @grant nodejs
//
///////////////////////////////
let CookiesJDTEST = $store.get('CookiesJD_TEST', 'array')
let CookiesJD = $store.get('CookiesJD', 'array')
let CookieJD = $store.get('CookieJD', 'string')
let CookieJD2 = $store.get('CookieJD2', 'string')
let CookiesJDV2P = $store.get('CookiesJDV2P', 'string')
///////////////////////////////CookiesJDV2P移动账号2往前为Top.1
if (CookiesJDV2P) {
  const cookieList = CookiesJDV2P.split("&")
  const TopUserID = cookieList[0].split(";")[1].replace(/pt_pin=/,"")
  const BeforeTopUserID = cookieList[1].split(";")[1].replace(/pt_pin=/,"")
  let cookieBackArr = cookieList.slice(0,1)
  let cookieFrontArr = cookieList.slice(1)

  //数组合并
  for (var i = 0; i < cookieBackArr.length; i++) {
    let Arrcode = cookieBackArr[i]
    cookieFrontArr.push(Arrcode)
  }

  const cookieCar = cookieFrontArr.join("&");
  $store.put(cookieCar, 'CookiesJDV2P', 'string') ? console.log(`👸TopUser变动:${TopUserID}→${BeforeTopUserID}`) : console.log("👸TopUser变动失败！❌");

}
