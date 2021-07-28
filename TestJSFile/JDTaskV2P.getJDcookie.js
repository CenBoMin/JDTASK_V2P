// @grant require;
// @grant nodejs;
const $ = new Env('🐶elecV2P京东扫码');
let s_token, cookies, guid, lsid, lstoken, okl_token, token
let evuid = 'jdcookie'
$.suffix = i => i > 0 ? i + 1 + '' : '';
$.nowTime = new Date().getTime();
$.isRewrite = 'undefined' !== typeof $request;
$.isResponse = 'undefined' !== typeof $response;
$.isTask = `undefined` === typeof $request;

//////////////////////////////////////////
!(async () => {
  await moduleCheck(['got', 'tough-cookie', 'qrcode-npm'])
  await loginEntrance()
  await generateQrcode()
  await getCookie()
})()
.catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

function execP(command) {
  console.log('start run command', command)
  return new Promise((resolve, reject) => {
    $exec(command, {
      timeout: 0,
      cb(data, error, finish) {
        if (finish) {
          console.log(command, 'finished')
          resolve(data)
        }
        error ? reject(error) : console.log(data)
      }
    })
  })
}

function taskUrl() {
  return {
    url: `https://plogin.m.jd.com/cgi-bin/mm/new_login_entrance?lang=chs&appid=300&returnurl=https://wq.jd.com/passport/LoginRedirect?state=${Date.now()}&returnurl=https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&/myJd/home.action&source=wq_passport`,
    headers: {
      'Connection': 'Keep-Alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'zh-cn',
      'Referer': `https://plogin.m.jd.com/login/login?appid=300&returnurl=https://wq.jd.com/passport/LoginRedirect?state=${Date.now()}&returnurl=https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&/myJd/home.action&source=wq_passport`,
      'User-Agent': 'jdapp;android;10.0.2;10;network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36',
      'Host': 'plogin.m.jd.com'
    }
  }
}

function taskPostUrl() {
  return {
    url: `https://plogin.m.jd.com/cgi-bin/m/tmauthreflogurl?s_token=${s_token}&v=${Date.now()}&remember=true`,
    body: `lang=chs&appid=300&source=wq_passport&returnurl=https://wqlogin2.jd.com/passport/LoginRedirect?state=${Date.now()}&returnurl=//home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&/myJd/home.action`,
    headers: {
      'Connection': 'Keep-Alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'zh-cn',
      'Referer': `https://plogin.m.jd.com/login/login?appid=300&returnurl=https://wq.jd.com/passport/LoginRedirect?state=${Date.now()}&returnurl=https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&/myJd/home.action&source=wq_passport`,
      'User-Agent': 'jdapp;android;10.0.2;10;network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36',
      'Host': 'plogin.m.jd.com'
    }
  }
}
////////////////////////////////////////////
//moduleCheck
async function moduleCheck(name, install = true) {
  const fs = require('fs')
  const path = require('path')

  if (Array.isArray(name)) {
    name = name.filter(n => {
      let mfolder = path.join('node_modules', n)
      if (fs.existsSync(mfolder)) {
        console.log('module', n, 'installed')
        return false
      }
      return true
    })
  } else if (typeof(name) === 'string') {
    let mfolder = path.join('node_modules', name)
    if (fs.existsSync(mfolder)) {
      console.log('module', name, 'installed')
      name = []
    } else {
      name = [name]
    }
  } else {
    console.log('unknow module name type', name)
    return false
  }
  if (name.length === 0) {
    console.log('all check modules are installed')
    return true
  }
  name = name.join(' ')
  console.log('module', name, 'not installed yet')
  if (install) {
    try {
      await execP('yarn add ' + name)
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }
  return false
}
function loginEntrance() {
  return new Promise((resolve) => {
    $.get(taskUrl(), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`);
        } else {
          $.headers = resp.headers;
          $.data = JSON.parse(data);
          await formatSetCookies($.headers, $.data);
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function formatSetCookies(headers, body) {
  new Promise(resolve => {
    s_token = body['s_token']
    guid = headers['set-cookie'][0]
    guid = guid.substring(guid.indexOf("=") + 1, guid.indexOf(";"))
    lsid = headers['set-cookie'][2]
    lsid = lsid.substring(lsid.indexOf("=") + 1, lsid.indexOf(";"))
    lstoken = headers['set-cookie'][3]
    lstoken = lstoken.substring(lstoken.indexOf("=") + 1, lstoken.indexOf(";"))
    cookies = "guid=" + guid + "; lang=chs; lsid=" + lsid + "; lstoken=" + lstoken + "; "
    resolve()
  })
}
function generateQrcode() {
  return new Promise((resolve) => {
    $.post(taskPostUrl(), (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`);
        } else {
          $.stepsHeaders = resp.headers;
          data = JSON.parse(data);
          token = data['token'];
          const setCookie = resp.headers['set-cookie'][0];
          okl_token = setCookie.substring(setCookie.indexOf("=") + 1, setCookie.indexOf(";"))
          const url = 'https://plogin.m.jd.com/cgi-bin/m/tmauth?appid=300&client_type=m&token=' + token;
          console.debug('token', token, 'okl_token', okl_token, '二维码url', url)

// >>>>>>>>>>>>>>>>>>>>>>>>>>输出二维码
          qrcode.generate(url);
          console.log("请打开 京东APP 扫码登录(二维码有效期为1分钟)");
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

//调用evui函数,生成一个新窗口用来扫码
const qrcode = {
  img(text){
    let qc = require('qrcode-npm')
    let qr = qc.qrcode(10, 'L')
    qr.addData(text)
    qr.make()

    return qr.createImgTag(6)
  },
  generate(url){
    console.log('将', url, '转换为二维码进行显示')
    $evui({
      id: evuid,
      title: 'V2P专用-JDCookie扫码工具',
      width: 550,
      height: 550,
      content: `<style>.bigf {font-size: 22px}</style><p><br></p><div class='center'><div class='eflex'>${this.img(url)}</div><p class="bigf">扫码，跳转登录添加/更新 cookie</p><div>`,
      style: {
        title: "background: #6B8E23;font-size: 25px;text-align:center;",   // 设置标题样式
      },
      cbable: false,
      cbhint: '扫码成功后，第一行表示 cookie 值\n第二行表示对应保存的 KEY',
      cblabel: '确定保存'
    }, data=>{
      let fck = data
      console.log('data from client:', fck)
      if (fck) {
        let res = ckJDPush(fck)
        $message.success(res)
      } else {
        console.log('没有收到任何数据')
        $message.error('后台没有收到任何数据')
      }
    })
  }
}
function ckJDPush(cookies) {
  if (!cookies) {
    console.log('请先输入 cookie')
  }else{
    $message.success('🤖 执行[扫码获取京东cookie]测试任务成功', 0)
    //执行任务关闭窗口 发送结果
    // testTask()
  }
}
function GetJDCookie(cookies) {
  //cookie值
  let ck = cookies;
  if (ck) {
    let acObj = {};
    let ckItems = ck.replace(/ /g, '').split(/[,;]/).filter(s => /^(pt_key|pt_pin)=.+/.test(s)).sort();
    if (ckItems.length == 2) {
      acObj.cookie = ckItems.join(';') + ';';
      acObj.userName = decodeURIComponent(acObj.cookie.match(/pt_pin=(.+?);/)[1]);
    }
    // 无cookie数据进行提示，有ck数据，找到账号位进行存储
    if (!acObj.cookie) {
      $feed.push($.name, '京东Cookie获取失败，请检查请求url是否正确')
    } else if (acObj.userName.match(/^\*+$/)) {
      // 未登录用户ck，跳过处理
    } else {
///////////////////////////////
      const CookieJD1 = $store.get('CookieJD', 'string')
      const CookieJD2 = $store.get('CookieJD2', 'string')
      const ckArr = [CookieJD1,CookieJD2];
      const oldCks = $store.get('CookiesJD', 'array');
      if (oldCks) {
        oldCks.forEach(item => ckArr.push(item.cookie));
      }else{
        console.log("🙅‍♂️ CookiesJD不存在");
      }

      let [status, seatNo] = chooseSeatNo(acObj.cookie, ckArr, /pt_pin=(.+?);/);
      if (status) {
        if (status > 0) {
          let wt = '';
          if (seatNo < 2) {
            wt = $store.put(acObj.cookie, `CookieJD${$.suffix(seatNo)}`, 'string')
            $message.success(`京东Cookie${seatNo+1}: ${acObj.userName}`, `${status==1?'新增':'更新'}京东Cookie${wt?`成功 🎉\n${ck}`:`失败 ‼️`}`, 0)
          } else {
            if (oldCks.length <= seatNo - 2) {
              oldCks.push(acObj);
            } else {
              oldCks[seatNo - 2] = acObj;
            }
            wt = $store.put(JSON.stringify(oldCks, null, 2), 'CookiesJD', 'array');
            $message.success(`京东Cookie${seatNo+1}: ${acObj.userName}`, `${status==1?'新增':'更新'}京东Cookie${wt?`成功 🎉\n${ck}`:`失败 ‼️`}`, 0)
          }
          $feed.push($.name, `京东Cookie${seatNo+1}: ${acObj.userName}\n${status==1?'新增':'更新'}京东Cookie${wt?`成功 🎉\n${ck}`:`失败 ‼️`}`)
          console.log(`京东Cookie${seatNo+1}: ${acObj.userName}`, `${status==1?'新增':'更新'}京东Cookie${wt?`成功 🎉\n${ck}`:`失败 ‼️`}`);
        } else {
          $.log(`京东Cookie${seatNo+1}: ${acObj.userName}`, 'Cookie数据已存在，跳过处理');
        }
      }
///////////////////////////////
    }
  }
}
function chooseSeatNo(newCk, allCk, reg) {
  // status-获取操作状态-0:异常、1-新增、2-更新、-1-相同 seatNo-存储位置，默认添加到最后面
  let [status, seatNo] = [1, allCk.length];
  try {
    let newId = ((newCk || '').match(reg) || ['', ''])[1];
    for (let i = 0, len = allCk.length; i < len; i++) {
      let oldId = ((allCk[i] || '').match(reg) || ['', ''])[1];
      if (oldId) {
        // 账号位数据存在，判断是否为当前账号的数据，不是则跳过，否则设置数据并跳出循环
        if (oldId == newId) {
          seatNo = i;
          status = newCk == allCk[i] ? -1 : 2;
          break;
        }
      } else if (seatNo == len) {
        // 旧cookie无效且在初始账号位，先标记新cookie数据存储于此位置
        seatNo = i;
        status = 1;
      }
    }
  } catch (e) {
    // 异常时，不操作cookie
    status = 0;
    $.logErr(e);
  }
  return [status, seatNo];
}
function checkLogin() {
  return new Promise((resolve) => {
    const options = {
      url: `https://plogin.m.jd.com/cgi-bin/m/tmauthchecktoken?&token=${token}&ou_state=0&okl_token=${okl_token}`,
      body: `lang=chs&appid=300&source=wq_passport&returnurl=https://wqlogin2.jd.com/passport/LoginRedirect?state=${Date.now()}&returnurl=//home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&/myJd/home.action`,
      headers: {
        'Referer': `https://plogin.m.jd.com/login/login?appid=300&returnurl=https://wqlogin2.jd.com/passport/LoginRedirect?state=${Date.now()}&returnurl=//home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&/myJd/home.action&source=wq_passport`,
        'Cookie': cookies,
        'Connection': 'Keep-Alive',
        'Content-Type': 'application/x-www-form-urlencoded; Charset=UTF-8',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'jdapp;android;10.0.2;10;network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36',
      }
    }
    $.post(options, (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`);
        } else {
          data = JSON.parse(data);
          $.checkLoginHeaders = resp.headers;
          // $.log(`errcode:${data['errcode']}`)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve(data || {});
      }
    })
  })
}
function getCookie() {
  let time = 60
  $.timer = setInterval(async () => {
    const checkRes = await checkLogin();
    if (checkRes['errcode'] === 0) {
      //扫描登录成功
      $.log(`扫描登录成功\n`)
      clearInterval($.timer);
      await formatCookie($.checkLoginHeaders);
      $.done();
    } else if (checkRes['errcode'] === 21) {
      $.log(`二维码已失效，请重新获取二维码重新扫描\n`);
      clearInterval($.timer);
      $.done();
    } else if (checkRes['errcode'] === 176) {
      //未扫描登录
    } else {
      $.log(`其他异常：${JSON.stringify(checkRes)}\n`);
      clearInterval($.timer);
      $.done();
    }
    if (time < 0) {
      clearInterval($.timer);
      console.log('扫码超时')
      //发送关闭前端 evui 界面的指令
      $ws.send({
        type: 'evui',
        data: {
          id: evuid,
          data: '扫码超时，如有需要请重新运行脚本'
        }
      })
      $message.error('扫码超时，如有需要请重新运行脚本', 10)
      $.done()
    } else {
      time--
    }
  }, 1000)
}
//扫码成功输出界面
function formatCookie(headers) {
  new Promise(resolve => {
    let pt_key = headers['set-cookie'][1]
    pt_key = pt_key.substring(pt_key.indexOf("=") + 1, pt_key.indexOf(";"))
    let pt_pin = headers['set-cookie'][2]
    pt_pin = pt_pin.substring(pt_pin.indexOf("=") + 1, pt_pin.indexOf(";"))
    let cookie1 = "pt_key=" + pt_key + ";pt_pin=" + pt_pin + ";";

    $.UserName = decodeURIComponent(cookie1.match(/pt_pin=(.+?);/) && cookie1.match(/pt_pin=(.+?);/)[1])
    $.log(`京东用户名：${$.UserName} 登录成功，此cookie(有效期为90天)如下：`);
    $.log(`\n${cookie1}\n`);
    GetJDCookie(cookie1);
    // 发送关闭前端 evui 界面的指令
    $ws.send({
      type: 'evui',
      data: {
        id: evuid,
        data: cookie1
      }
    })
    GetJDCookie(cookie1);
    $ws.send({ type: 'evui', data: { id: evuid, type: 'close' }})
    resolve()
  })
}
// prettier-ignore
function Env(name, opts) {
  class Http {
    constructor(env) {
      this.env = env
    }

    send(opts, method = 'GET') {
      opts = typeof opts === 'string' ? { url: opts } : opts
      let sender = this.get
      if (method === 'POST') {
        sender = this.post
      }
      return new Promise((resolve, reject) => {
        sender.call(this, opts, (err, resp, body) => {
          if (err) reject(err)
          else resolve(resp)
        })
      })
    }

    get(opts) {
      return this.send.call(this.env, opts)
    }

    post(opts) {
      return this.send.call(this.env, opts, 'POST')
    }
  }

  return new (class {
    constructor(name, opts) {
      this.name = name
      this.http = new Http(this)
      this.data = null
      this.dataFile = 'box.dat'
      this.logs = []
      this.isMute = false
      this.isNeedRewrite = false
      this.logSeparator = '\n'
      this.startTime = new Date().getTime()
      Object.assign(this, opts)
      this.log('', `🔔${this.name}, 开始!`)
    }

    isNode() {
      return true
      return 'undefined' !== typeof module && !!module.exports
    }

    isQuanX() {
      return false
      return 'undefined' !== typeof $task
    }

    isSurge() {
      return false
      return 'undefined' !== typeof $httpClient && 'undefined' === typeof $loon
    }

    isLoon() {
      return false
      return 'undefined' !== typeof $loon
    }

    toObj(str, defaultValue = null) {
      try {
        return JSON.parse(str)
      } catch {
        return defaultValue
      }
    }

    toStr(obj, defaultValue = null) {
      try {
        return JSON.stringify(obj)
      } catch {
        return defaultValue
      }
    }

    getjson(key, defaultValue) {
      let json = defaultValue
      const val = this.getdata(key)
      if (val) {
        try {
          json = JSON.parse(this.getdata(key))
        } catch {}
      }
      return json
    }

    setjson(val, key) {
      try {
        return this.setdata(JSON.stringify(val), key)
      } catch {
        return false
      }
    }

    getScript(url) {
      return new Promise((resolve) => {
        this.get({ url }, (err, resp, body) => resolve(body))
      })
    }

    runScript(script, runOpts) {
      return new Promise((resolve) => {
        let httpapi = this.getdata('@chavy_boxjs_userCfgs.httpapi')
        httpapi = httpapi ? httpapi.replace(/\n/g, '').trim() : httpapi
        let httpapi_timeout = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
        httpapi_timeout = httpapi_timeout ? httpapi_timeout * 1 : 20
        httpapi_timeout = runOpts && runOpts.timeout ? runOpts.timeout : httpapi_timeout
        const [key, addr] = httpapi.split('@')
        const opts = {
          url: `http://${addr}/v1/scripting/evaluate`,
          body: { script_text: script, mock_type: 'cron', timeout: httpapi_timeout },
          headers: { 'X-Key': key, 'Accept': '*/*' }
        }
        this.post(opts, (err, resp, body) => resolve(body))
      }).catch((e) => this.logErr(e))
    }

    loaddata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        if (isCurDirDataFile || isRootDirDataFile) {
          const datPath = isCurDirDataFile ? curDirDataFilePath : rootDirDataFilePath
          try {
            return JSON.parse(this.fs.readFileSync(datPath))
          } catch (e) {
            return {}
          }
        } else return {}
      } else return {}
    }

    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require('fs')
        this.path = this.path ? this.path : require('path')
        const curDirDataFilePath = this.path.resolve(this.dataFile)
        const rootDirDataFilePath = this.path.resolve(process.cwd(), this.dataFile)
        const isCurDirDataFile = this.fs.existsSync(curDirDataFilePath)
        const isRootDirDataFile = !isCurDirDataFile && this.fs.existsSync(rootDirDataFilePath)
        const jsondata = JSON.stringify(this.data)
        if (isCurDirDataFile) {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        } else if (isRootDirDataFile) {
          this.fs.writeFileSync(rootDirDataFilePath, jsondata)
        } else {
          this.fs.writeFileSync(curDirDataFilePath, jsondata)
        }
      }
    }

    lodash_get(source, path, defaultValue = undefined) {
      const paths = path.replace(/\[(\d+)\]/g, '.$1').split('.')
      let result = source
      for (const p of paths) {
        result = Object(result)[p]
        if (result === undefined) {
          return defaultValue
        }
      }
      return result
    }

    lodash_set(obj, path, value) {
      if (Object(obj) !== obj) return obj
      if (!Array.isArray(path)) path = path.toString().match(/[^.[\]]+/g) || []
      path
        .slice(0, -1)
        .reduce((a, c, i) => (Object(a[c]) === a[c] ? a[c] : (a[c] = Math.abs(path[i + 1]) >> 0 === +path[i + 1] ? [] : {})), obj)[
        path[path.length - 1]
      ] = value
      return obj
    }

    getdata(key) {
      let val = this.getval(key)
      // 如果以 @
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
        const objval = objkey ? this.getval(objkey) : ''
        if (objval) {
          try {
            const objedval = JSON.parse(objval)
            val = objedval ? this.lodash_get(objedval, paths, '') : val
          } catch (e) {
            val = ''
          }
        }
      }
      return val
    }

    setdata(val, key) {
      let issuc = false
      if (/^@/.test(key)) {
        const [, objkey, paths] = /^@(.*?)\.(.*?)$/.exec(key)
        const objdat = this.getval(objkey)
        const objval = objkey ? (objdat === 'null' ? null : objdat || '{}') : '{}'
        try {
          const objedval = JSON.parse(objval)
          this.lodash_set(objedval, paths, val)
          issuc = this.setval(JSON.stringify(objedval), objkey)
        } catch (e) {
          const objedval = {}
          this.lodash_set(objedval, paths, val)
          issuc = this.setval(JSON.stringify(objedval), objkey)
        }
      } else {
        issuc = this.setval(val, key)
      }
      return issuc
    }

    getval(key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.read(key)
      } else if (this.isQuanX()) {
        return $prefs.valueForKey(key)
      } else if (this.isNode()) {
        this.data = this.loaddata()
        return this.data[key]
      } else {
        return (this.data && this.data[key]) || null
      }
    }

    setval(val, key) {
      if (this.isSurge() || this.isLoon()) {
        return $persistentStore.write(val, key)
      } else if (this.isQuanX()) {
        return $prefs.setValueForKey(val, key)
      } else if (this.isNode()) {
        this.data = this.loaddata()
        this.data[key] = val
        this.writedata()
        return true
      } else {
        return (this.data && this.data[key]) || null
      }
    }

    initGotEnv(opts) {
      this.got = this.got ? this.got : require('got')
      this.cktough = this.cktough ? this.cktough : require('tough-cookie')
      this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()
      if (opts) {
        opts.headers = opts.headers ? opts.headers : {}
        if (undefined === opts.headers.Cookie && undefined === opts.cookieJar) {
          opts.cookieJar = this.ckjar
        }
      }
    }

    get(opts, callback = () => {}) {
      if (opts.headers) {
        delete opts.headers['Content-Type']
        delete opts.headers['Content-Length']
      }
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          opts.headers = opts.headers || {}
          Object.assign(opts.headers, { 'X-Surge-Skip-Scripting': false })
        }
        $httpClient.get(opts, (err, resp, body) => {
          if (!err && resp) {
            resp.body = body
            resp.statusCode = resp.status
          }
          callback(err, resp, body)
        })
      } else if (this.isQuanX()) {
        if (this.isNeedRewrite) {
          opts.opts = opts.opts || {}
          Object.assign(opts.opts, { hints: false })
        }
        $task.fetch(opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp
            callback(null, { status, statusCode, headers, body }, body)
          },
          (err) => callback(err)
        )
      } else if (this.isNode()) {
        this.initGotEnv(opts)
        this.got(opts)
          .on('redirect', (resp, nextOpts) => {
            try {
              if (resp.headers['set-cookie']) {
                const ck = resp.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                if (ck) {
                  this.ckjar.setCookieSync(ck, null)
                }
                nextOpts.cookieJar = this.ckjar
              }
            } catch (e) {
              this.logErr(e)
            }
            // this.ckjar.setCookieSync(resp.headers['set-cookie'].map(Cookie.parse).toString())
          })
          .then(
            (resp) => {
              const { statusCode: status, statusCode, headers, body } = resp
              callback(null, { status, statusCode, headers, body }, body)
            },
            (err) => {
              const { message: error, response: resp } = err
              callback(error, resp, resp && resp.body)
            }
          )
      }
    }

    post(opts, callback = () => {}) {
      // 如果指定了请求体, 但没指定`Content-Type`, 则自动生成
      if (opts.body && opts.headers && !opts.headers['Content-Type']) {
        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
      if (opts.headers) delete opts.headers['Content-Length']
      if (this.isSurge() || this.isLoon()) {
        if (this.isSurge() && this.isNeedRewrite) {
          opts.headers = opts.headers || {}
          Object.assign(opts.headers, { 'X-Surge-Skip-Scripting': false })
        }
        $httpClient.post(opts, (err, resp, body) => {
          if (!err && resp) {
            resp.body = body
            resp.statusCode = resp.status
          }
          callback(err, resp, body)
        })
      } else if (this.isQuanX()) {
        opts.method = 'POST'
        if (this.isNeedRewrite) {
          opts.opts = opts.opts || {}
          Object.assign(opts.opts, { hints: false })
        }
        $task.fetch(opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp
            callback(null, { status, statusCode, headers, body }, body)
          },
          (err) => callback(err)
        )
      } else if (this.isNode()) {
        this.initGotEnv(opts)
        const { url, ..._opts } = opts
        this.got.post(url, _opts).then(
          (resp) => {
            const { statusCode: status, statusCode, headers, body } = resp
            callback(null, { status, statusCode, headers, body }, body)
          },
          (err) => {
            const { message: error, response: resp } = err
            callback(error, resp, resp && resp.body)
          }
        )
      }
    }
    /**
     *
     * 示例:$.time('yyyy-MM-dd qq HH:mm:ss.S')
     *    :$.time('yyyyMMddHHmmssS')
     *    y:年 M:月 d:日 q:季 H:时 m:分 s:秒 S:毫秒
     *    其中y可选0-4位占位符、S可选0-1位占位符，其余可选0-2位占位符
     * @param {*} fmt 格式化参数
     *
     */
    time(fmt) {
      let o = {
        'M+': new Date().getMonth() + 1,
        'd+': new Date().getDate(),
        'H+': new Date().getHours(),
        'm+': new Date().getMinutes(),
        's+': new Date().getSeconds(),
        'q+': Math.floor((new Date().getMonth() + 3) / 3),
        'S': new Date().getMilliseconds()
      }
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length))
      for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      return fmt
    }

    /**
     * 系统通知
     *
     * > 通知参数: 同时支持 QuanX 和 Loon 两种格式, EnvJs根据运行环境自动转换, Surge 环境不支持多媒体通知
     *
     * 示例:
     * $.msg(title, subt, desc, 'twitter://')
     * $.msg(title, subt, desc, { 'open-url': 'twitter://', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     * $.msg(title, subt, desc, { 'open-url': 'https://bing.com', 'media-url': 'https://github.githubassets.com/images/modules/open_graph/github-mark.png' })
     *
     * @param {*} title 标题
     * @param {*} subt 副标题
     * @param {*} desc 通知详情
     * @param {*} opts 通知参数
     *
     */
    msg(title = name, subt = '', desc = '', opts) {
      const toEnvOpts = (rawopts) => {
        if (!rawopts) return rawopts
        if (typeof rawopts === 'string') {
          if (this.isLoon()) return rawopts
          else if (this.isQuanX()) return { 'open-url': rawopts }
          else if (this.isSurge()) return { url: rawopts }
          else return undefined
        } else if (typeof rawopts === 'object') {
          if (this.isLoon()) {
            let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
            let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
            return { openUrl, mediaUrl }
          } else if (this.isQuanX()) {
            let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
            let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
            return { 'open-url': openUrl, 'media-url': mediaUrl }
          } else if (this.isSurge()) {
            let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
            return { url: openUrl }
          }
        } else {
          return undefined
        }
      }
      if (!this.isMute) {
        if (this.isSurge() || this.isLoon()) {
          $notification.post(title, subt, desc, toEnvOpts(opts))
        } else if (this.isQuanX()) {
          $notify(title, subt, desc, toEnvOpts(opts))
        }
      }
      if (!this.isMuteLog) {
        let logs = ['', '==============📣系统通知📣==============']
        logs.push(title)
        subt ? logs.push(subt) : ''
        desc ? logs.push(desc) : ''
        console.log(logs.join('\n'))
        this.logs = this.logs.concat(logs)
      }
    }

    log(...logs) {
      if (logs.length > 0) {
        this.logs = [...this.logs, ...logs]
      }
      console.log(logs.join(this.logSeparator))
    }

    logErr(err, msg) {
      const isPrintSack = !this.isSurge() && !this.isQuanX() && !this.isLoon()
      if (!isPrintSack) {
        this.log('', `❗️${this.name}, 错误!`, err)
      } else {
        this.log('', `❗️${this.name}, 错误!`, err.stack)
      }
    }

    wait(time) {
      return new Promise((resolve) => setTimeout(resolve, time))
    }

    done(val = {}) {
      const endTime = new Date().getTime()
      const costTime = (endTime - this.startTime) / 1000
      this.log('', `🔔${this.name}, 结束! 🕛 ${costTime} 秒`)
      this.log()
      if (this.isSurge() || this.isQuanX() || this.isLoon()) {
        $done(val)
      }
    }
  })(name, opts)
}
