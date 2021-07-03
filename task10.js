// @grant nodejs
// cron:0,30,59 59 7,15,23 * * *

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
