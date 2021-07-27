// @grant nodejs
console.log("⏳ 开始执行 关注有礼")
$exec('python3 https://raw.githubusercontents.com/curtinlv/JD-Script/main/getFollowGifts/jd_getFollowGift.py', {
  cwd: 'script/Shell', timeout: 0,
  env: {
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
