// @grant nodejs
//#东东健康社区收集能量收集能量jd_health_collect.js
$exec('node jd_health_collect.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

// @grant nodejs
//燃动夏季smiek2221
$exec('\cp jd_summer_movement.js ../faker2', {
  cwd: 'script/JSFile/scripts',
  timeout: 0,
  cb(data, error, finish) {
    if (finish) {
      $exec('node jd_summer_movement.js', {
        cwd: 'script/JSFile/faker2',
        timeout: 0,
        env: {
          ...process.env,
          V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
          JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
          summer_movement_ShHelpFlag:1,
          summer_movement_HelpHelpHelpFlag:true
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

// // @grant nodejs
// // 点点券Aaron-lv
// $exec('node jd_summer_movement.js', {
//   cwd: 'script/JSFile/sync', timeout: 0,
//   env: {
//     ...process.env,
//     V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
//     JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
//     summer_movement_ShHelpFlag:1,
//     summer_movement_HelpHelpHelpFlag:true
//   },
//   cb(data, error){
//     error ? console.error(error) : console.log(data)
//   }
// })
// @grant nodejs
//赚京豆
$exec('node jd_syj.js', {
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
// #东东超市
$exec('node jd_superMarket.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
