// @grant nodejs
//全民摸冰jd_mb.js
$exec('node jd_mb.js', {
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
// #跳跳乐瓜分京豆脚本jd_jump.js
$exec('node jd_jump.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
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
// cron:0 0 0-16/8,20 * * *
//小鸽有礼
$exec('node jd_daily_lottery.js', {
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
// 女装盲盒
$exec('node jd_nzmh.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
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
// 点点券smiek2221
$exec('node https://raw.githubusercontent.com/smiek2221/scripts/master/JDJRValidator_Pure.js', {
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
// 点点券Aaron-lv
$exec('node https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_necklace.js', {
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
//签到领现金
$exec('node jd_cash.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    CASH_EXCHANGE: true,
    JD_CASH_SHARECODES: $store.get('JDCashV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

// @grant nodejs
// 东东小窝
$exec('node jd_small_home.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

// 5G超级盲盒
$exec('node jd_mohe.js', {
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

// 京东直播
$exec('node jd_live.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
