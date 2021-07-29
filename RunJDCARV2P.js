// @grant nodejs
let jstask = $JDTASK
$exec(`node ${jstask}`, {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    //基础变量
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDCARV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
