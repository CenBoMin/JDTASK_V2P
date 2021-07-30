// @grant require;
// @grant nodejs;

///////////////////////////////
let CookiesJD = $store.get('CookiesJD', 'array')
let CookieJD = $store.get('CookieJD', 'string')
let CookieJD2 = $store.get('CookieJD2', 'string')
let CookiesJDV2P = $store.get('CookiesJDV2P', 'string')
let CookiesJDCARV2P = $store.get('CookiesJDCARV2P', 'string')

///////////////////////////////
if (CookiesJDV2P ) {
  const cookieList = CookiesJDV2P.split("&")
  let cookieBackArr = cookieList.slice(0, 5)
  let cookieFrontArr = cookieList.slice(5)

  //数组合并
  for (var i = 0; i < cookieBackArr.length; i++) {
    let Arrcode = cookieBackArr[i]
    cookieFrontArr.push(Arrcode)
  }

  const cookieCar = cookieFrontArr.join("&");
  $store.put(cookieCar, 'CookiesJDCARV2P', 'string') ? console.log("🌟 CookiesJDCARV2P转换成功！请到store/cookie 常量储存管理查看") : console.log("CookiesJDCARV2P转换失败！❌");

}else {
  /////////////////////////////// 更新执行任务的cookie值：CookiesJDV2P
  if (CookiesJD && CookieJD && CookieJD2) {
    const CookiesJDList = CookiesJD.map(item => item.cookie)
    CookiesJDList.unshift(CookieJD2);
    CookiesJDList.unshift(CookieJD);
    const cookieV2P1 = CookiesJDList.join("&");
    $store.put(cookieV2P1, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！请到在执行一次转换CookiesJDCARV2P") : console.log("CookiesJDV2P转换失败！❌");
  }else if (CookiesJD) {
    const CookiesJDList = CookiesJD.map(item => item.cookie)
    const cookieV2P1 = CookiesJDList.join("&");
    $store.put(cookieV2P1, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！请到在执行一次转换CookiesJDCARV2P") : console.log("CookiesJDV2P转换失败！❌");

  } else {
    if (CookieJD2) {
      const CookiesJDList = new Array();
      CookiesJDList.unshift(CookieJD2);
      CookiesJDList.unshift(CookieJD);
      const cookieV2P2 = CookiesJDList.join("&");
      $store.put(cookieV2P2, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！请到在执行一次转换CookiesJDCARV2P") : console.log("CookiesJDV2P转换失败！❌");
    } else {
      $store.put(CookieJD, 'CookiesJDV2P', 'string') ? console.log("🌟 CookiesJDV2P转换成功！请到在执行一次转换CookiesJDCARV2P") : console.log("CookiesJDV2P转换失败！❌");
    }
  }
}
