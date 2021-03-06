// @grant require
// @grant nodejs
//============================
$message.loading("🔄 正在安装JDTASKV2P ",15)
//============================
const $ = new Env("JDTASKV2P安装");
let s_token, cookies, guid, lsid, lstoken, okl_token, token
let evuid = 'jdcookie'
!(async () => {
  // await delTestLog();
  await moduleCheck(['got', 'tough-cookie', 'qrcode-npm', 'png-js', 'qrcode-npm', 'tunnel', 'crypto-js', 'download', 'tough-cookie', 'request', 'ws', 'qrcode-terminal','http-server'])

  await intiCheck();
  // await loginEntrance()
  // await generateQrcode()
  // await getCookie()

})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })
//============================
function testTask() {
  $ws.send({ type: 'evui', data: { id: evuid, type: 'close' }})
  $exec('node jd_bean_change.js', {
    cwd: 'script/JSFile/jd_scripts', timeout: 0,
    env: {
      ...process.env,
      V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
      JD_COOKIE: $store.get('CookiesJDTest', 'string')
    },
    cb(data, error , finish){
      error ? console.error(error) : console.log(data)
      if (finish) {
        reboot();
      }
    }
  })
}
async function moduleCheck(name, install = true) {
  const fs = require('fs')
  const path = require('path')

  if (Array.isArray(name)) {
    name = name.filter(n=>{
      let mfolder = path.join('node_modules', n)
      if (fs.existsSync(mfolder)) {
        console.log(`-[ok] module→${n}已安装`)
        return false
      }
      return true
    })
  } else if (typeof(name) === 'string') {
    let mfolder = path.join('node_modules', name)
    if (fs.existsSync(mfolder)) {
      console.log(`-[ok] module→${name}已安装`)
      name = []
    } else {
      name = [name]
    }
  } else {
    console.log('-[XX] 未知的module类型:', name)
    return false
  }
  if (name.length === 0) {
    console.log('恭喜,所有module已安装 🎉')

    return true
  }
  name = name.join(' ')
  console.log(`-[XX] module→${name}未安装`)
  if (install) {
    try {
      await installModule();
      return true
    } catch(e) {
      console.error(e)
      return false
    }
  }
  return false
}
async function intiCheck() {
    $message.loading("🤖 使用国内镜像下载Alpine Linux包管理工具apk", 3)
    $exec("sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories", {
      cwd: 'script/JSFile',
      cb(data, error) {
        error ? console.error(error) : console.log(data)
      }
    })
    intiTask();
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
          qrcode.generate(url); // 输出二维码
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
      $ws.send({ type: 'evui', data: { id: evuid, data: '扫码超时，如有需要请重新运行脚本' }})
      $message.error('扫码超时，如有需要请重新运行脚本', 10)
      $.done()
    } else {
      time--
    }
  }, 1000)
}
//============================
function ckJDPush(cookies) {
  if (!cookies) {
    console.log('请先输入 cookie')
  }else{
    $store.put(cookies,'CookiesJDTest',"")
    $message.success('🤖 执行[京东变动通知]测试任务\n请查看运行日志', 5)
    testTask()
    $.done();
  }
}
const qrcode = {
  img(text){
    let qc = require('qrcode-npm')
    let qr = qc.qrcode(6, 'L')
    qr.addData(text)
    qr.make()

    return qr.createImgTag(6)
  },
  generate(url){
    console.log('将', url, '转换为二维码进行显示')
    $evui({
      id: evuid,
      title: '打开京东 APP 扫码获取 cookie',
      width: 780,
      height: 570,
      content: `<style>.bigf {font-size: 32px;margin: 16px;color: var(--back-bk);opacity: 0.3;}</style><div class='center'><div class='eflex'><span class="bigf">Powered<br>BY elecV2P</span>${this.img(url)}<span class="bigf">测试使用<br>请勿用于<br>实际生产环境中</span></div><p><br>输入Cookie有两种方式,扫码测试或者直接贴上测试<br>显示Cookie之后,点击"确定保存"立即执行测试任务！<br></p><div>`,
      style: {
        cbdata: "height: 132px;",
      },
      cbable: true,
      cbhint: '显示Cookie之后,点击"确定保存"立即执行测试任务！',
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
        'User-Agent': 'jdapp;android;10.0.5;11;0393465333165363-5333430323261366;network/wifi;model/M2102K1C;osVer/30;appBuild/88681;partner/lc001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; M2102K1C Build/RKQ1.201112.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045534 Mobile Safari/537.36',
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
function formatCookie(headers) {
  new Promise(resolve => {
    let pt_key = headers['set-cookie'][1]
    pt_key = pt_key.substring(pt_key.indexOf("=") + 1, pt_key.indexOf(";"))
    let pt_pin = headers['set-cookie'][2]
    pt_pin = pt_pin.substring(pt_pin.indexOf("=") + 1, pt_pin.indexOf(";"))
    const cookie1 = "pt_key=" + pt_key + ";pt_pin=" + pt_pin + ";";

    $.UserName = decodeURIComponent(cookie1.match(/pt_pin=(.+?);/) && cookie1.match(/pt_pin=(.+?);/)[1])
    $.log(`京东用户名：${$.UserName} 登录成功，此cookie(有效期为90天)如下：`);
    $.log(`\n${cookie1}\n`);
    // 发送给前端
    $ws.send({ type: 'evui', data: { id: evuid, data: cookie1}})
    resolve()
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
function taskUrl() {
  return {
    url: `https://plogin.m.jd.com/cgi-bin/mm/new_login_entrance?lang=chs&appid=300&returnurl=https://wq.jd.com/passport/LoginRedirect?state=${Date.now()}&returnurl=https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&/myJd/home.action&source=wq_passport`,
    headers: {
      'Connection': 'Keep-Alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Language': 'zh-cn',
      'Referer': `https://plogin.m.jd.com/login/login?appid=300&returnurl=https://wq.jd.com/passport/LoginRedirect?state=${Date.now()}&returnurl=https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&/myJd/home.action&source=wq_passport`,
      'User-Agent': 'jdapp;android;10.0.5;11;0393465333165363-5333430323261366;network/wifi;model/M2102K1C;osVer/30;appBuild/88681;partner/lc001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; M2102K1C Build/RKQ1.201112.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045534 Mobile Safari/537.36',
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
      'User-Agent': 'jdapp;android;10.0.5;11;0393465333165363-5333430323261366;network/wifi;model/M2102K1C;osVer/30;appBuild/88681;partner/lc001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; M2102K1C Build/RKQ1.201112.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045534 Mobile Safari/537.36',
      'Host': 'plogin.m.jd.com'
    }
  }
}
function installModule() {
  //============================
  $message.loading("🤖 检测有Module未安装-开始执行[模块安装程序]", 21)
  //============================
  $message.loading("🤖 使用国内镜像下载npm", 3)
  $exec("npm config set /usr/local/app/script/JSFile/npm http://registry.npm.taobao.org", {
    cwd: 'script/JSFile',
    cb(data, error) {
      error ? console.error(error) : console.log(data)
    }
  })
  moduleTask();
}
function moduleTask() {
  for (let i = 0; i < 8; i++) {
    (function (i) {
      setTimeout(function () {
        if (i == 0) {
          $message.loading("⏳ 下载模块文件:module.sh", 2)
          $download('https://ghproxy.com/https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/module.sh', {
            folder: './script/JSFile',
            name: 'module.sh'
          }).then(d=> $message.success("✅  module.sh已下载script/JSFile", 5)).catch(e=>console.error(e))
        }else if (i == 1) {
          $message.loading("⏳ 任务准备安装中...", 5)
          $exec('chmod +x ./module.sh', {
            cwd: 'script/JSFile',
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 2) {
          $message.loading("⏳ 开始安装...请稍等片刻后...\n", 60)
          $exec('./module.sh', {
            cwd: 'script/JSFile',timeout: 0,
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        }else if (i == 6) {
        $message.loading("⏳ 查看运行日志,检查模块安装完成,再次执行JS\n", 30)
        }
      },(i + 1) * 4000);
    })(i);
  }
}
function intiTask() {
  $exec('rm -rf deldata.sh', {
    cwd: 'script/JSFile',
    cb(data, error) {
      error ? console.error(error) : console.log(data)
    }
  })
  for (let i = 0; i < 8; i++) {
    (function(i) {
      setTimeout(function() {
        if (i == 0) {
          $exec('wget https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/deldata.sh', {
            cwd: 'script/JSFile',
            timeout: 0,
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        } else if (i == 3) {
          $exec('chmod +x deldata.sh', {
            cwd: 'script/JSFile',
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        } else if (i == 4) {
          $exec('./deldata.sh', {
            cwd: 'script/JSFile',
            timeout: 0,
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        } else if (i == 7) {
          // 开始安装 python
          console.log("🌟 开始...安装python");
          $exec('apk add python3 py3-pip', {
            call: true, timeout: 0,
            cwd: 'script/Shell',
            cb(data, error, finish){
              if (!error && finish) {
                // 安装一些 python 库，根据需要自行选择更改
                $exec('pip3 install you-get youtube-dl requests', { cb(data, error){error ? console.error(error) : reboot()} })

                // python 和库安装完成后可直接在系统或其他脚本中调用，不需要再次安装
                // 下面这段代码可在新的脚本中单独运行
                console.log("🌟 开始...测试Py脚本运行,显示当前python版本号");
                $exec('python3 -u test.py', {
                  cwd: 'script/Shell',    // test.py 所在目录（其他文件可通过 EFSS 文件管理界面进行上传
                  cb(data, error){
                    error ? console.error(error) : console.log(data)
                  }
                })
              } else {
                error ? console.error(error) : console.log(data)
              }
            }
          })
        }
      }, (i + 1) * 4000);
    })(i);
  }
}
function checkCmd(cmd) {
  return new Promise((resolve, reject)=>{
    $exec(cmd, {
      timeout: 0,
      cb(data, error){
        if (error) {
          console.error(error)
          reject(error.message || error)
        } else {
          console.log(data)
          resolve()
        }
      }
    })
  })
}
function delTestLog() {
   $exec('rm -f *.log', {
  // 如果是在 windows powershell 下使用 nodejs 的方式运行，使用 rm *.log 命令替换，即 $exec('rm *.log', {...})
  cwd: './logs',        // 日志文件所在文件夹（重要
  call: true,
  cb(data, error, finish){
    error ? console.error(error) : console.log(data)
    if (finish) {
      console.log('上一个测试日志已删除..')
    }
  }
})
}
function reboot() {
  $message.loading("🔄 安装完成！正在重启elecv2p ",7)
  $message.success("🆗 重启elecv2p成功 ",0)
  $exec('pm2 restart elecV2P', {
    cb(data, error){
      if (error) {
        console.error(error)
        console.log('尝试使用 pm2 的方式重启失败，将直接重启服务器')
        $exec('reboot')
      } else {
        console.log(data)
      }
    }
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
