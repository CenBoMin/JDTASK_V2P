// @grant nodejs
// 京喜财富岛/Aaron-lvjd_cfd_loop
$exec('node https://raw.githubusercontent.com/Aaron-lv/sync/jd_scripts/jd_cfd.js', {
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
//财富大陆smiek2221
$exec('node https://raw.githubusercontent.com/smiek2221/scripts/master/gua_wealth_island.js', {
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
