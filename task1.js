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
//店铺签到jd_shop_sign.js
$exec('node jd_shop_sign.js', {
  cwd: 'script/JSFile/JDTASK_V2P/JDScriptsBak', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

// @grant nodejs
//京东财富岛提现jd_cfdtx.js
$exec('node jd_cfdtx.js', {
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
//京东零食街jd_lsj.js
$exec('node jd_lsj.js', {
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
//早起福利jd_goodMorning.js
$exec('node jd_goodMorning.js', {
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
//#京东签到验证
$exec('node jd_sign_graphics.js', {
  cwd: 'script/JSFile/faker2', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_bean_sign.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})


//#摇京豆
$exec('node jd_club_lottery.js', {
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
