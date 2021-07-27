// @grant nodejs
console.log("⏳ 开始执行【JD入会领豆】,10豆即入会")
$exec('python3 https://ghproxy.com/https://raw.githubusercontent.com/curtinlv/JD-Script/main/OpenCard/jd_OpenCard.py', {
  cwd: 'script/Shell', timeout: 0,
  env: {
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    openCardBean: 10,
    memory: false
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
