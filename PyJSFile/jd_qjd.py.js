// @grant nodejs
console.log("⏳ 开始执行 全民抢京豆（7.22-7.31)")
$exec('python3 https://raw.githubusercontent.com/curtinlv/JD-Script/main/jd_qjd.py', {
  cwd: 'script/Shell', timeout: 0,
  env: {
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    qjd_zlzh: ['13507558350_p','jd_62d956f606288']
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
