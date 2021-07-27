// @grant nodejs
console.log("⏳ 开始执行 签到领现金助力py")
$exec('python3 https://raw.githubusercontents.com/curtinlv/JD-Script/main/jd_cashHelp.py', {
  cwd: 'script/Shell',
  timeout: 0,
  env: {
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    cash_zlzh: ['13507558350 _p', 'jd_62d956f606288']
  },
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})
