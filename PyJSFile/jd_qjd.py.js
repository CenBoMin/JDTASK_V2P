// @grant nodejs
console.log("⏳ 开始执行 全民抢京豆（7.22-7.31)")
$exec('python3 https://raw.githubusercontent.com/curtinlv/JD-Script/main/jd_qjd.py', {
  cwd: 'script/Shell', timeout: 0,
  env: {
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    qjd_zlzh: $store.get('PtPinJDV2P_PY', 'array')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
