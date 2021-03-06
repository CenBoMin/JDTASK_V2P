//============================
const $ = new Env("JDTASKV2P手动拉库");

!(async () => {
  console.log("🌟 开始...gitclone拉脚本");
    await intiTask();
    await $.wait(65000)
   console.log("🌟 开始...gitpull更新");
    await gitPull();
    await $.wait(8000)
   console.log("✅ JDTASKV2P手动拉库:完成")
    await reboot();
  })()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {

    $.done();
  })
//============================

function intiTask() {
  $exec('rm -rf inti.sh', {
    cwd: 'script/JSFile',
    cb(data, error) {
      error ? console.error(error) : console.log(data)
    }
  })
  for (let i = 0; i < 8; i++) {
    (function(i) {
      setTimeout(function() {
        if (i == 0) {
          // $message.loading("⏳ 下载初始化文件:inti.sh", 2)
          $exec('wget https://ghproxy.com/https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/inti.sh', {
            cwd: 'script/JSFile',
            timeout: 0,
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })

          $exec('wget https://ghproxy.com/https://raw.githubusercontent.com/elecV2/elecV2P/master/script/Shell/test.py', {
            cwd: 'script/Shell',
            timeout: 0,
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        } else if (i == 1) {
          // $message.loading("⏳ 初始化任务准备安装中...", 5)
          $exec('chmod +x ./inti.sh', {
            cwd: 'script/JSFile',
            cb(data, error) {
              error ? console.error(error) : console.log(data)
            }
          })
        } else if (i == 2) {
          // $message.loading("⏳ 开始安装...请稍等片刻", 5)
          $exec('./inti.sh', {
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
                $exec('pip3 install you-get youtube-dl requests', { cb(data, error){error ? console.error(error) : console.log(data)} })

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
function gitPull() {
  /*
  1.8小时拉一次库更新
  2.加入自定义通知...到机器人
  */

  console.log("✅  开始git pull更新库文件");

  //CenBoMin/JDTASK_V2P
  $exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/CenBoMin/JDTASK_V2P && git pull origin main:CenBoMin && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
    cwd: 'script/JSFile/JDTASK_V2P',
    timeout: 0,
    cb(data, error) {
      error ? console.error(error) : console.log(data)
    }
  })

  //smiek2221/scripts
  $exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/smiek2221/scripts && git pull origin master:smiek2221 && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
    cwd: 'script/JSFile/scripts',
    timeout: 0,
    cb(data, error) {
      error ? console.error(error) : console.log(data)
    }
  })

  //shufflewzc/faker2
  $exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/shufflewzc/faker2 && git pull origin main:faker2 && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
    cwd: 'script/JSFile/faker2',
    timeout: 0,
    cb(data, error) {
      error ? console.error(error) : console.log(data)
    }
  })

  //JDHelloWorld/jd_scripts
  $exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/JDHelloWorld/jd_scripts && git pull origin main:JDHelloWorld && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
    cwd: 'script/JSFile/jd_scripts',
    timeout: 0,
    cb(data, error) {
      error ? console.error(error) : console.log(data)
    }
  })

  //Aaron-lv/sync
  $exec('git config pull.rebase false && git fetch https://ghproxy.com/https://github.com/Aaron-lv/sync && git pull origin jd_scripts:Aaron && git log --pretty=format:"%h - %an, %ar : %s" --since=2.day', {
    cwd: 'script/JSFile/sync',
    timeout: 0,
    cb(data, error) {
      error ? console.error(error) : console.log(data)
    }
  })

};
function reboot() {
  $message.loading("🔄 正在重启elecv2p ",7)
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
      opts = typeof opts === 'string' ? {
        url: opts
      } : opts
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

  return new(class {
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
        this.get({
          url
        }, (err, resp, body) => resolve(body))
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
          body: {
            script_text: script,
            mock_type: 'cron',
            timeout: httpapi_timeout
          },
          headers: {
            'X-Key': key,
            'Accept': '*/*'
          }
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
          Object.assign(opts.headers, {
            'X-Surge-Skip-Scripting': false
          })
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
          Object.assign(opts.opts, {
            hints: false
          })
        }
        $task.fetch(opts).then(
          (resp) => {
            const {
              statusCode: status,
              statusCode,
              headers,
              body
            } = resp
            callback(null, {
              status,
              statusCode,
              headers,
              body
            }, body)
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
              const {
                statusCode: status,
                statusCode,
                headers,
                body
              } = resp
              callback(null, {
                status,
                statusCode,
                headers,
                body
              }, body)
            },
            (err) => {
              const {
                message: error,
                response: resp
              } = err
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
          Object.assign(opts.headers, {
            'X-Surge-Skip-Scripting': false
          })
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
          Object.assign(opts.opts, {
            hints: false
          })
        }
        $task.fetch(opts).then(
          (resp) => {
            const {
              statusCode: status,
              statusCode,
              headers,
              body
            } = resp
            callback(null, {
              status,
              statusCode,
              headers,
              body
            }, body)
          },
          (err) => callback(err)
        )
      } else if (this.isNode()) {
        this.initGotEnv(opts)
        const {
          url,
          ..._opts
        } = opts
        this.got.post(url, _opts).then(
          (resp) => {
            const {
              statusCode: status,
              statusCode,
              headers,
              body
            } = resp
            callback(null, {
              status,
              statusCode,
              headers,
              body
            }, body)
          },
          (err) => {
            const {
              message: error,
              response: resp
            } = err
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
          else if (this.isQuanX()) return {
            'open-url': rawopts
          }
          else if (this.isSurge()) return {
            url: rawopts
          }
          else return undefined
        } else if (typeof rawopts === 'object') {
          if (this.isLoon()) {
            let openUrl = rawopts.openUrl || rawopts.url || rawopts['open-url']
            let mediaUrl = rawopts.mediaUrl || rawopts['media-url']
            return {
              openUrl,
              mediaUrl
            }
          } else if (this.isQuanX()) {
            let openUrl = rawopts['open-url'] || rawopts.url || rawopts.openUrl
            let mediaUrl = rawopts['media-url'] || rawopts.mediaUrl
            return {
              'open-url': openUrl,
              'media-url': mediaUrl
            }
          } else if (this.isSurge()) {
            let openUrl = rawopts.url || rawopts.openUrl || rawopts['open-url']
            return {
              url: openUrl
            }
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
