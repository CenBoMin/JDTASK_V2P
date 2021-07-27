// @grant nodejs
console.log("⏳ 开始执行 签到领现金助力py")
$exec('python3 https://raw.githubusercontents.com/curtinlv/JD-Script/main/jd_cashHelp.py', {
  cwd: 'script/Shell',
  timeout: 0,
  env: {
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    cash_zlzh: $store.get('PtPinJDV2P_PY', 'array')
  },
  cb(data, error) {
    error ? console.error(error) : console.log(data)
  }
})
