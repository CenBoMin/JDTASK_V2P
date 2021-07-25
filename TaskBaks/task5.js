// @grant nodejs
//东东乐园大风车jd_ddnc_farmpark.js
$exec('node jd_ddnc_farmpark.js', {
  cwd: 'script/JSFile/faker2', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    lsjdh: "jdAward3"
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

// @grant nodejs
// #京小鸽吾悦寄jd_jxg.js
$exec('node jd_jxg.js', {
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
// #京东秒秒币
$exec('node jd_ms.js', {
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
// @grant nodejs
//#京东汽车
$exec('node jd_car.js', {
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
// @grant nodejs
// #取关京东店铺商品
$exec('node jd_unsubscribe.js', {
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
// @grant nodejs
// #进店领豆
$exec('node jd_shop.js', {
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

// @grant nodejs
// #京东全民开红包
$exec('node jd_redPacket.js', {
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
