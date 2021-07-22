// @grant nodejs
// 京喜财富岛挂机/Aaron-lv
$exec('node jd_cfd_loop.js', {
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
