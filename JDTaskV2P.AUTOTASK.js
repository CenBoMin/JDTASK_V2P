const $ = new Env('elecV2P')
const v2purl = $.getval('v2purl');
const v2ptoken = $.getval('v2token');
let tz = "";
//++++++++++++++++++++++++++++++++++++++++
!(async () => {
  console.log("\n* Author:CenBoMin\n* Github:github.com/CenBoMin/GithubSync\n* Telegram:https://t.me/CbScript\n* Updatetime:2021.06.20\n");
  console.log(`Now login(UTC+8):${new Date(new Date().getTime()).toLocaleString()}`)
  //++++++++++++++++++++++++++++++++++++++++
  console.log(`\n🔎[检查主页地址和WebhookToken]`);
  await $.wait(1000)
  if (!v2purl || !v2ptoken) {
    console.log(`→主页地址或WebhookToken不存在✖️\n‼️请先在Store填入自己V2P服务器的主页地址和WebhookToken`);
    console.log(`→🌟 主页地址cookie值:v2purl`);
    console.log(`→🌟 WebhookToken:v2token`);
  } else {
    console.log(`→BOXJS主页地址或WebhookToken存在👌`);
  }
  //--------------------------------------
  console.log(`\n🔎[检查主页地址格式]`);
  await $.wait(1000)
  if (v2purl.split("/")[3] === undefined) {
    console.log(`→BOXJS主页地址格式正确👌\n`);
  } else {
    console.log(`→BOXJS主页地址格式错误✖️\n‼️主页地址最后没有"/"\n🌰错误例子:http://198.1.1.4:1234/`);
  }
  //++++++++++++++++++++++++++++++++++++++++
  console.log(`\n🤖[${$.name}]:💲获取脚本执行需要的数据`)
  await getVersion();
  console.log(`→V2P服务器上的cookie列表`)
  await getKeyList();
  console.log(`→JDTASK任务订阅`)
  await getCronList();
  console.log(`→下载必要的依赖JS`)
  await JDJSmodule();

  //++++++++++++++++++++++++++++++++++++++++

    let nowUpdateTaskArr = allinoneList
    console.log(`→预备更新定时任务个数为:${nowUpdateTaskArr.length}个`);

    //++++++++++++++++++++++++++++++++++++++++
      console.log(`\n🤖[${$.name}]:💲开始上传定时任务 🙆‍♀️`)
      for (let i = 0; i < nowUpdateTaskArr.length; i++) {
        V2PtaskName = nowUpdateTaskArr[i].split("tag=")[1].split(",")[0];
        V2PtaskCron = nowUpdateTaskArr[i].split("https")[0];
        V2PtaskUrl = nowUpdateTaskArr[i].split(":")[1].split(", tag=")[0].replace(/\/\//,"RUNJDTASK_V2P.js -env JDTASK=https://");
        await pushtask();
      }

      console.log(`\n🤖[${$.name}]:💲✅ 保存任务列表`)
      await tasksave();


      // $.msg($.name, `💡已更新JDTASK任务列表`);
  // }

  // if (tz) {
  //   await showmsg1();
  // }
})().catch((e) => {
  $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
}).finally(() => {
  $.done();
})
//++++++++++++++++++++++++++++++++++++++++
async function JDJSmodule() {
  await downloadJS("RunJDTaskV2P","https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/RunJDTaskV2P.js","./script/JSFile")

  await downloadJS("JDCOOKIE","https://raw.githubusercontent.com/JDHelloWorld/jd_scripts/main/jdCookie.js","./script/JSFile")

  await downloadJS("USER_AGENTS-1","https://raw.githubusercontent.com/JDHelloWorld/jd_scripts/main/JS_USER_AGENTS.js","./script/JSFile")

  await downloadJS("USER_AGENTS-2","https://raw.githubusercontent.com/shufflewzc/faker2/main/JS1_USER_AGENTS.js","./script/JSFile")

  await downloadJS("USER_AGENTS-3","https://raw.githubusercontent.com/shufflewzc/faker2/main/USER_AGENTS.js","./script/JSFile")

  await downloadJS("jdDreamFactoryShareCodes","https://raw.githubusercontent.com/JDHelloWorld/jd_scripts/main/jdDreamFactoryShareCodes.js","./script/JSFile")

  await downloadJS("jdFactoryShareCodes","https://raw.githubusercontent.com/JDHelloWorld/jd_scripts/main/jdFactoryShareCodes.js","./script/JSFile")

  await downloadJS("jdFruitShareCodes","https://raw.githubusercontent.com/JDHelloWorld/jd_scripts/main/jdFruitShareCodes.js","./script/JSFile")

  await downloadJS("jdJxncShareCodes","https://raw.githubusercontent.com/JDHelloWorld/jd_scripts/main/jdJxncShareCodes.js","./script/JSFile")

  await downloadJS("jdPetShareCodes","https://raw.githubusercontent.com/JDHelloWorld/jd_scripts/main/jdPetShareCodes.js","./script/JSFile")

  await downloadJS("jdPlantBeanShareCodes","https://raw.githubusercontent.com/JDHelloWorld/jd_scripts/main/jdPlantBeanShareCodes.js","./script/JSFile")

  await downloadJS("JD_DailyBonus","https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/utils/JD_DailyBonus.js","./script/JSFile/utils")

  await downloadJS("JDJRValidator_Pure","https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/utils/JDJRValidator_Pure.js","./script/JSFile")

  await downloadJS("JDJRValidator_Pure","https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/utils/JDJRValidator_Pure.js","./script/JSFile/utils")

  await downloadJS("MoveMentFaker","https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/utils/MoveMentFaker.js","./script/JSFile")

  await downloadJS("MoveMentFaker","https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/utils/MoveMentFaker.js","./script/JSFile/utils")

  await downloadJS("JDSignValidator","https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/utils/JDSignValidator.js","./script/JSFile")

  await downloadJS("JDSignValidator","https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/utils/JDSignValidator.js","./script/JSFile/utils")

  await downloadJS("ZooFaker_Necklace","https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/utils/ZooFaker_Necklace.js","./script/JSFile")

  await downloadJS("ZooFaker_Necklace","https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/utils/ZooFaker_Necklace.js","./script/JSFile")

  await downloadJS("sign_graphics_validate","https://raw.githubusercontent.com/smiek2221/scripts/master/sign_graphics_validate.js","./script/JSFile")

  await downloadJS("jd_sign_graphics","https://raw.githubusercontent.com/smiek2221/scripts/master/jd_sign_graphics.js","./script/JSFile")
}
async function showmsg1() {
  $.msg(`${$.name}任务执行通知🔔`, tz);
}
async function downloadJS(str,jsurl,dest) {
  $download(`${jsurl}`, {
  folder: dest,
}).then(d=>console.log(`〽️ ${str}`)).catch(e=>console.error(e))
}

// async function downloadJS(str,jsurl,dest) {
//   console.log(`〽️ ${str}`);
//   return new Promise((resolve) => {
//     let url = {
//       url: `${v2purl}/webhook`,
//       body: JSON.stringify({
//         token: `${v2ptoken}`,
//         type: 'download',
//         op: 'put',
//         url: jsurl,
//         dest: dest
//       }),
//       folder: './script/JSFile',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       method: 'put'
//     };
//     $.post(url, async (err, resp, data) => {
//       try {
//         if (err) {
//           console.log("⛔️API查询请求失败❌ ‼️‼️");
//           console.log(JSON.stringify(err));
//           $.logErr(err);
//         } else {
//           data = JSON.parse(data);
//           const code = data.rescode
//           switch (code) {
//             case -1:
//               console.log(`\n❌ 下载脚本失败`);
//               // $.msg($.name, `💡上传定时任务:${data.taskinfo.name}`);
//               break;
//             case 0:
//               console.log(`\n📥 成功下载脚本`);
//               // $.msg($.name, `💡上传定时任务:${data.taskinfo.name}`);
//               break;
//             default:
//               $.log(`\n‼️${resp.statusCode}[pushtask调试log]:${resp.body}`);
//
//           }
//         }
//       } catch (e) {
//         $.logErr(e, resp);
//       } finally {
//         resolve();
//       }
//     });
//   });
// }
async function tasksave() {
  return new Promise((resolve) => {
    let url = {
      url: `${v2purl}/webhook`,
      body: JSON.stringify({
        token: `${v2ptoken}`,
        type: 'tasksave',
        op: 'put',
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put'
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          console.log(data);
          data = JSON.parse(data);
          const code = data.rescode
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve();
      }
    });
  });
}
async function pushtask() {
  return new Promise((resolve) => {
    let url = {
      url: `${v2purl}/webhook`,
      body: JSON.stringify({
        token: `${v2ptoken}`,
        type: 'taskadd',
        op: 'put',
        task: {
          name: V2PtaskName,
          type: 'cron',
          job: {
            type: 'runjs',
            target: V2PtaskUrl,
          },
          time: V2PtaskCron,
          running: true
        },
        options: { // v3.4.2 增加。可省略
          type: 'replace' // 当任务列表中存在同名任务时的更新方式。replace: 替换原有任务，skip: 跳过添加新任务，addition: 新增任务
        }
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'put'
    };
    $.post(url, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败❌ ‼️‼️");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          data = JSON.parse(data);
          const code = data.rescode
          switch (code) {
            case -1:
              console.log(`\n❌ 更新定时任务失败:${data.taskinfo.name}\n${data.taskinfo.time} ${data.taskinfo.job.target}`);
              // $.msg($.name, `💡上传定时任务:${data.taskinfo.name}`);
              break;
            case 0:
              console.log(`\n💡 成功更新定时任务:${data.taskinfo.name}`);
              // $.msg($.name, `💡上传定时任务:${data.taskinfo.name}`);
              break;
            default:
              $.log(`\n‼️${resp.statusCode}[pushtask调试log]:${resp.body}`);

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
async function getVersion() {
  return new Promise((resolve) => {
    const options = initTaskOptions("info");
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            // $.log(data)
            data = JSON.parse(data);
            v2pversion = data.elecV2P.version
            const versionArr = v2pversion.split(".");
            const versionSum = (versionArr[0] * 1) + (versionArr[1] * 1)
            console.log(`→V2P服务器版本号:${v2pversion}`);
            if (versionSum < 6) {
              console.log(`⚠️V2P服务器版本号低于3.3.3,请先更新你的V2P版本`);
              tz += ($.name, '', `⚠️V2P服务器版本号低于3.3.3,请先更新你的V2P版本`);
              $.done();
            }
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
async function getKeyList() {
  return new Promise((resolve) => {
    const options = initTaskOptions("store&op=all");
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            // $.log(data)
            getKeyListdata = JSON.parse(data);
            //下载的data是一个cookie数组
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
async function getCronList() {
  return new Promise((resolve) => {
    const options = {
      // url: `https://ghproxy.com/https://raw.githubusercontent.com/shufflewzc/faker/main/qx.json`
      url: `https://ghproxy.com/https://raw.githubusercontent.com/CenBoMin/JDTASK_V2P/main/JDTaskV2P.autosync.json`
    };
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            // $.log(data)
            data = JSON.parse(data);
            allinoneList = data.task
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
async function getV2PTask() {
  return new Promise((resolve) => {
    const options = initTaskOptions("task");
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log("⛔️API查询请求失败，请检查自身设备网络情况");
          console.log(JSON.stringify(err));
          $.logErr(err);
        } else {
          if (safeGet(data)) {
            // $.log(data)
            v2pTaskObj = JSON.parse(data);
            let v2pTaskArr = new Array();
            let v2ptaskDataArr = new Array();
            v2ptaskDataArr2 = new Array();
            for (let obj in v2pTaskObj) {
              v2pTaskArr.push(obj)
            }
            for (let i = 0; i < v2pTaskArr.length; i++) {
              let v2ptaskData = v2pTaskObj[v2pTaskArr[i]].job.target;
              v2ptaskDataArr.push(v2ptaskData)
            }
            for (let i = 0; i < v2ptaskDataArr.length; i++) {
              let v2ptaskData2 = v2ptaskDataArr[i].replace(/https:\/\/ghproxy.com\//g, "")
              v2ptaskDataArr2.push(v2ptaskData2)
            }
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

//++++++++++++++++++++++++++++++++++++++++
function initTaskOptions(type) {
  return {
    url: `${v2purl}/webhook?token=${v2ptoken}&type=${type}`,
  };
}
//数组indexof删除元素
async function ArrindexOfDel(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    let index = arr[i].indexOf(val)
    if (index > -1) {
      return arr.splice(i, 1)
    }
  }
};
//双数组去重
function distinct(a, b) {
  let arr = a.concat(b)
  let result = []
  let obj = {}

  for (let i of arr) {
    if (!obj[i]) {
      result.push(i)
      obj[i] = 1
    }
  }

  return result
}
//去重
function unique(arr) {
  return Array.from(new Set(arr))
}

function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`⛔️服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s)
        })
      })
    }
    get(t) {
      return this.send.call(this.env, t)
    }
    post(t) {
      return this.send.call(this.env, t, "POST")
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports
    }
    isQuanX() {
      return "undefined" != typeof $task
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon
    }
    isLoon() {
      return "undefined" != typeof $loon
    }
    isShadowrocket() {
      return "undefined" != typeof $rocket
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t)
      } catch {
        return e
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t)
      } catch {
        return e
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t))
      } catch {}
      return s
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e)
      } catch {
        return !1
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i))
      })
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"), a = {
          url: `http://${h}/v1/scripting/evaluate`,
          body: {
            script_text: t,
            mock_type: "cron",
            timeout: r
          },
          headers: {
            "X-Key": o,
            Accept: "*/*"
          }
        };
        this.post(a, (t, e, i) => s(i))
      }).catch(t => this.logErr(t))
    }
    loaddata() {
      if (!this.isNode()) return {}; {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {}; {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i))
          } catch (t) {
            return {}
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i)
        if (r = Object(r)[t], void 0 === r) return s;
      return r
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e
        } catch (t) {
          e = ""
        }
      }
      return e
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
        }
      } else s = this.setval(t, e);
      return s
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
    }
    get(t, e = (() => {})) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
          }
        } catch (t) {
          this.logErr(t)
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body)
      }))
    }
    post(t, e = (() => {})) {
      const s = t.method ? t.method.toLocaleLowerCase() : "post";
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient[s](t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      });
      else if (this.isQuanX()) t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t));
      else if (this.isNode()) {
        this.initGotEnv(t);
        const {
          url: i,
          ...r
        } = t;
        this.got[s](i, r).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o)
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body)
        })
      }
    }
    time(t, e = null) {
      const s = e ? new Date(e) : new Date;
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            }
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            }
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            }
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
        t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
      }
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }
    done(t = {}) {
      const e = (new Date).getTime(),
        s = (e - this.startTime) / 1e3;
      this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
    }
  }(t, e)
}
