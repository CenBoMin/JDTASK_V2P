const $ = new Env('东东超市兑换奖品');
const notify = $.isNode() ? require('./sendNotify') : '';
let allMessage = '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let coinToBeans = '超值京豆包'; //兑换多少数量的京豆（20或者1000），0表示不兑换，默认不兑换京豆，如需兑换把0改成20或者1000，或者'商品名称'(商品名称放到单引号内)即可
let jdNotify = false;//是否开启静默运行，默认false关闭(即:奖品兑换成功后会发出通知提示)
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

const JD_API_HOST = `https://api.m.jd.com/api?appid=jdsupermarket`;
Date.prototype.Format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
var _0xodh='jsjiami.com.v6',_0x34d8=[_0xodh,'QcOOZXY+wpo=','SMOsW0E9','w7fCksKOw4Ar','LsOgwonDv8KEw50=','w6XCkAPCoQs=','wpLDnnxQw5Q=','w5AHw5/DnTo=','wqrCosOTwr85','wrjCoRHDi2PDqw==','wpPDkG8=','w7jDpOWljui2iTbCo+WMg+WZpcKaWg==','woENwr7Dmi1cOw==','jfsjzrPixAamiNI.yxDnhtcom.v6=='];(function(_0x12f6eb,_0x3c574c,_0x397eee){var _0x3a33d8=function(_0x102bf0,_0xe03bd2,_0x46d3e2,_0xc50330,_0x3c75fb){_0xe03bd2=_0xe03bd2>>0x8,_0x3c75fb='po';var _0x4342da='shift',_0x1e789f='push';if(_0xe03bd2<_0x102bf0){while(--_0x102bf0){_0xc50330=_0x12f6eb[_0x4342da]();if(_0xe03bd2===_0x102bf0){_0xe03bd2=_0xc50330;_0x46d3e2=_0x12f6eb[_0x3c75fb+'p']();}else if(_0xe03bd2&&_0x46d3e2['replace'](/[fzrPxANIyxDnht=]/g,'')===_0xe03bd2){_0x12f6eb[_0x1e789f](_0xc50330);}}_0x12f6eb[_0x1e789f](_0x12f6eb[_0x4342da]());}return 0x98275;};return _0x3a33d8(++_0x3c574c,_0x397eee)>>_0x3c574c^_0x397eee;}(_0x34d8,0x198,0x19800));var _0x1652=function(_0xb67384,_0x27295a){_0xb67384=~~'0x'['concat'](_0xb67384);var _0x22c9c8=_0x34d8[_0xb67384];if(_0x1652['CFldFa']===undefined){(function(){var _0x35aedc=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0xa9c080='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x35aedc['atob']||(_0x35aedc['atob']=function(_0xfd277a){var _0x2048b2=String(_0xfd277a)['replace'](/=+$/,'');for(var _0x39f824=0x0,_0x23f64f,_0x172f59,_0x5489f2=0x0,_0x2ca197='';_0x172f59=_0x2048b2['charAt'](_0x5489f2++);~_0x172f59&&(_0x23f64f=_0x39f824%0x4?_0x23f64f*0x40+_0x172f59:_0x172f59,_0x39f824++%0x4)?_0x2ca197+=String['fromCharCode'](0xff&_0x23f64f>>(-0x2*_0x39f824&0x6)):0x0){_0x172f59=_0xa9c080['indexOf'](_0x172f59);}return _0x2ca197;});}());var _0x211fa3=function(_0x3d0c7c,_0x27295a){var _0x2722a3=[],_0x10a05d=0x0,_0x5b96eb,_0x86c128='',_0x3c58eb='';_0x3d0c7c=atob(_0x3d0c7c);for(var _0x1902b4=0x0,_0x462a03=_0x3d0c7c['length'];_0x1902b4<_0x462a03;_0x1902b4++){_0x3c58eb+='%'+('00'+_0x3d0c7c['charCodeAt'](_0x1902b4)['toString'](0x10))['slice'](-0x2);}_0x3d0c7c=decodeURIComponent(_0x3c58eb);for(var _0x576d89=0x0;_0x576d89<0x100;_0x576d89++){_0x2722a3[_0x576d89]=_0x576d89;}for(_0x576d89=0x0;_0x576d89<0x100;_0x576d89++){_0x10a05d=(_0x10a05d+_0x2722a3[_0x576d89]+_0x27295a['charCodeAt'](_0x576d89%_0x27295a['length']))%0x100;_0x5b96eb=_0x2722a3[_0x576d89];_0x2722a3[_0x576d89]=_0x2722a3[_0x10a05d];_0x2722a3[_0x10a05d]=_0x5b96eb;}_0x576d89=0x0;_0x10a05d=0x0;for(var _0x744bea=0x0;_0x744bea<_0x3d0c7c['length'];_0x744bea++){_0x576d89=(_0x576d89+0x1)%0x100;_0x10a05d=(_0x10a05d+_0x2722a3[_0x576d89])%0x100;_0x5b96eb=_0x2722a3[_0x576d89];_0x2722a3[_0x576d89]=_0x2722a3[_0x10a05d];_0x2722a3[_0x10a05d]=_0x5b96eb;_0x86c128+=String['fromCharCode'](_0x3d0c7c['charCodeAt'](_0x744bea)^_0x2722a3[(_0x2722a3[_0x576d89]+_0x2722a3[_0x10a05d])%0x100]);}return _0x86c128;};_0x1652['pXLVtL']=_0x211fa3;_0x1652['pdqBkq']={};_0x1652['CFldFa']=!![];}var _0x1a36d8=_0x1652['pdqBkq'][_0xb67384];if(_0x1a36d8===undefined){if(_0x1652['ABprjO']===undefined){_0x1652['ABprjO']=!![];}_0x22c9c8=_0x1652['pXLVtL'](_0x22c9c8,_0x27295a);_0x1652['pdqBkq'][_0xb67384]=_0x22c9c8;}else{_0x22c9c8=_0x1a36d8;}return _0x22c9c8;};!(async()=>{var _0x59e9d3={'tFknJ':function(_0x53dcbe,_0x7e695c){return _0x53dcbe<_0x7e695c;},'OMLZb':function(_0x1c2648,_0x46d036){return _0x1c2648-_0x46d036;},'ZsDsl':function(_0x1ea750,_0x45b137){return _0x1ea750/_0x45b137;},'MxJVg':function(_0x2fe30c,_0x43b14d){return _0x2fe30c+_0x43b14d;},'eQMXr':function(_0x6e338a,_0x4c6129){return _0x6e338a(_0x4c6129);},'GOymz':function(_0x36b9aa,_0x175ccd){return _0x36b9aa>_0x175ccd;}};let _0x3f377e=new Date()[_0x1652('0','%2rT')]('ss');let _0x330f35=0x3a;if(_0x59e9d3['tFknJ'](_0x3f377e,0x3a)){let _0x360b3a=_0x59e9d3[_0x1652('1','%2rT')](_0x330f35,_0x3f377e)*0x3e8;console['log']('等待时间\x20'+_0x59e9d3[_0x1652('2','O&&6')](_0x360b3a,0x3e8));await sleep(_0x360b3a);}let _0x59a89c=[];for(let _0x3688ee=0x0;_0x3688ee<cookiesArr[_0x1652('3','ZccE')];_0x3688ee++){if(cookiesArr[_0x3688ee]){cookie=cookiesArr[_0x3688ee];let _0x579a2b={'index':_0x59e9d3['MxJVg'](_0x3688ee,0x1),'isLogin':!![],'cookie':cookie,'nickName':_0x59e9d3['eQMXr'](decodeURIComponent,cookie[_0x1652('4','sv2P')](/pt_pin=([^; ]+)(?=;?)/)&&cookie[_0x1652('5','X)$h')](/pt_pin=([^; ]+)(?=;?)/)[0x1])};await _0x59e9d3[_0x1652('6','XnAx')](TotalBean,_0x579a2b);_0x59a89c['push'](_0x579a2b);}}if(_0x59e9d3[_0x1652('7','t^t(')](_0x59a89c[_0x1652('8','GyUa')],0x0)){await Promise['all'](_0x59a89c['map']((_0x5b0126,_0x57f8b4)=>joyReward(_0x5b0126)));}})()['catch'](_0x50786e=>{$[_0x1652('9','X)$h')]('','❌\x20'+$['name']+_0x1652('a','GyUa')+_0x50786e+'!','');})[_0x1652('b','^Hw#')](()=>{$['done']();});;_0xodh='jsjiami.com.v6';

async function joyReward(ac) {
  try {
    ac.result = ''
    let count = 5;
    do {
      // await $.wait(mscheck)
      await smtg_queryPrize(ac)
      count--
    } while (count > 0)
  } catch (e) {
    $.logErr(e)
    ac.result = $.toStr(e)
  }
  return ac;
}

//查询任务
async function smtg_queryPrize(ac) {
  $.queryPrizeData = [];
  return new Promise((resolve) => {
    const options = {
      url : `https://api.m.jd.com/api?appid=jdsupermarket&functionId=smt_queryPrizeAreas&clientVersion=8.0.0&client=m&body=%7B%22channel%22:%221%22%7D&t=${Date.now()}`,
      headers : {
        'Origin' : `https://jdsupermarket.jd.com`,
        'Cookie' : ac.cookie,
        'Connection' : `keep-alive`,
        'Accept' : `application/json, text/plain, */*`,
        'Referer' : `https://jdsupermarket.jd.com/game/?tt=1597540727225`,
        'Host' : `api.m.jd.com`,
        'Accept-Encoding' : `gzip, deflate, br`,
        'Accept-Language' : `zh-cn`
      }
    };
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            // $.log(data)
            data = JSON.parse(data);
            console.log(`超值京豆包(0点限量)数量:${data.data.result.areas[0].prizes[1].finished}`);
            smtg_obtainPrize(ac);
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
//换京豆
function smtg_obtainPrize(ac) {
  const body = {
    "connectId": 19,
    "areaId": 6,
    "periodId": 6,
    "informationParam": {
      "eid": "",
      "referUrl": -1,
      "shshshfp": "",
      "openId": -1,
      "isRvc": 0,
      "fp": -1,
      "shshshfpa": "",
      "shshshfpb": "",
      "userAgent": -1
    },
    "channel": "18"
  }
  return new Promise((resolve) => {
    const options = {
      url : `https://api.m.jd.com/api?appid=jdsupermarket&functionId=smt_exchangePrize&clientVersion=8.0.0&client=m&body=${encodeURIComponent(JSON.stringify(body))}&t=${Date.now()}`,
      headers : {
        'Origin' : `https://jdsupermarket.jd.com`,
        'Cookie' : ac.cookie,
        'Connection' : `keep-alive`,
        'Accept' : `application/json, text/plain, */*`,
        'Referer' : `https://jdsupermarket.jd.com/game/?tt=1597540727225`,
        'Host' : `api.m.jd.com`,
        'Accept-Encoding' : `gzip, deflate, br`,
        'Accept-Language' : `zh-cn`
      }
    };
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            $.log(data)
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
function smtgHome() {
  return new Promise((resolve) => {
    $.get(taskUrl(ac,'smtg_home'), (err, resp, data) => {
      try {
        if (err) {
          console.log('\n东东超市兑换奖品: API查询请求失败 ‼️‼️')
          console.log(JSON.stringify(err));
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.data.bizCode === 0) {
              const { result } = data.data;
              $.totalGold = result.totalGold;
              $.totalBlue = result.totalBlue;
              console.log(`【总蓝币】${$.totalBlue}个\n`);
            }
          }
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    })
  })
}

// //通知
function msgShow() {
  // $.msg($.name, ``, `【京东账号${$.index}】${$.nickName}\n【收取蓝币】${$.coincount ? `${$.coincount}个` : $.coinerr }${coinToBeans ? `\n【兑换京豆】${ $.beanscount ? `${$.beanscount}个` : $.beanerr}` : ""}`);
  return new Promise(async resolve => {
    // $.log(`\n【京东账号${$.index}】${$.nickName || $.UserName}\n${coinToBeans ? `【兑换1000豆】${$.beanscount ? `成功` : $.beanerr}` : "您设置的是不兑换奖品"}\n`);
    if ($.isNode() && process.env.MARKET_REWARD_NOTIFY) {
      $.ctrTemp = `${process.env.MARKET_REWARD_NOTIFY}` === 'false';
    } else if ($.getdata('jdSuperMarketRewardNotify')) {
      $.ctrTemp = $.getdata('jdSuperMarketRewardNotify') === 'false';
    } else {
      $.ctrTemp = `${jdNotify}` === 'false';
    }
    //默认只在兑换奖品成功后弹窗提醒。情况情况加，只打印日志，不弹窗
    if ($.beanscount && $.ctrTemp) {
      $.msg($.name, ``, `【京东账号${$.index}】${$.nickName || $.UserName}\n${coinToBeans ? `【兑换${$.title}】${ $.beanscount ? `成功，数量：${$.beanscount}个` : $.beanerr}` : "您设置的是不兑换奖品"}`);
      allMessage += `【京东账号${$.index}】${$.nickName || $.UserName}\n${coinToBeans ? `【兑换${$.title}】${$.beanscount ? `成功，数量：${$.beanscount}个` : $.beanerr}` : "您设置的是不兑换奖品"}${$.index !== cookiesArr.length ? '\n\n' : ''}`
      // if ($.isNode()) {
      //   await notify.sendNotify(`${$.name} - 账号${$.index} - ${$.nickName}`, `【京东账号${$.index}】${$.nickName}\n${coinToBeans ? `【兑换${$.title}】${$.beanscount ? `成功，数量：${$.beanscount}个` : $.beanerr}` : "您设置的是不兑换奖品"}`)
      // }
    }
    resolve()
  })
}
function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1")
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === 13) {
              $.isLogin = false; //cookie过期
              return
            }
            if (data['retcode'] === 0) {
              $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
            } else {
              $.nickName = $.UserName
            }
          } else {
            console.log(`京东服务器返回空数据`)
          }
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}
function taskUrl(ac,function_id, body = {}) {
  return {
    url: `${JD_API_HOST}&functionId=${function_id}&clientVersion=8.0.0&client=m&body=${escape(JSON.stringify(body))}&t=${Date.now()}`,
    headers: {
      'User-Agent': $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      'Host': 'api.m.jd.com',
      'Cookie': ac.cookie,
      'Referer': 'https://jdsupermarket.jd.com/game',
      'Origin': 'https://jdsupermarket.jd.com',
    }
  }
}
function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}
function sleep(timeout) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
