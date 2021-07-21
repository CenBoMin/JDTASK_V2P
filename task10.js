// @grant nodejs
//#宠旺旺换豆验证
$exec('node jd_joy_reward_auth.js', {
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
//#东东健康社区兑换jd_health_exchange.js
$exec('node jd_health_exchange.js', {
  cwd: 'script/JSFile/JDTASK_V2P/JDScriptsBak', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    HEALTH_EXCHANGE: 20
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

// @grant nodejs
//幸运大转盘jd_market_lottery.js
$exec('node jd_market_lottery.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
