// @grant nodejs
// 京喜财富岛/Aaron-lvjd_cfd_loop
$exec('node jd_cfd.js', {
  cwd: 'script/JSFile/sync',
  timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})

// @grant nodejs
// 省钱大赢家之翻翻乐
$exec('node jd_big_winner.js', {
  cwd: 'script/JSFile/sync',
  timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})

// @grant nodejs
//#故事会 财富大陆smiek2221
$exec('\cp gua_wealth_island.js ../jd_scripts', {
  cwd: 'script/JSFile/scripts',
  timeout: 0,
  cb(data, error, finish) {
    if (finish) {
      $exec('node gua_wealth_island.js', {
        cwd: 'script/JSFile/jd_scripts',
        timeout: 0,
        env: {
          ...process.env,
          JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
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

// @grant nodejs
// 旺旺乐园
$exec('node jd_joy-park.js', {
  cwd: 'script/JSFile/faker2',
  timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})
