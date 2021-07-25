// @grant nodejs
//#特务Zxjd_productZ4Brand.js
$exec('node https://raw.githubusercontent.com/star261/jd/main/scripts/jd_productZ4Brand.js', {
  cwd: 'script/JSFile/faker2', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
//美丽研究院jd_beauty.js
$exec('node jd_beauty.js', {
  cwd: 'script/JSFile/faker2', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

// @grant nodejs
//京东京喜牧场
$exec('node jd_jxmc.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
//惊喜开团
$exec('node star_dreamFactory_tuan.js', {
  cwd: 'script/JSFile/JDTASK_V2P/JDScriptsBak', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
// #宠汪汪偷好友积分与狗粮smiek2221
$exec('\cp jd_joy_steal.js ../JDTASK_V2P/JDScriptsBak', {
  cwd: 'script/JSFile/scripts',
  timeout: 0,
  cb(data, error, finish) {
    if (finish) {
      $exec('node jd_joy_steal.js', {
        cwd: 'script/JSFile/JDTASK_V2P/JDScriptsBak',
        timeout: 0,
        env: {
          ...process.env,
          JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
          JOY_HELP_FEED:true,
          jdJoyStealCoin:true,
        },
        cb(data, error) {
          error ? console.error(error) : console.log(data)
        }
      })
    } else {
      error ? console.error(error) : console.log(data)
    }
  }
})
// #天天提鹅
$exec('node jd_daily_egg.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
