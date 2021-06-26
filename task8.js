// - task8: #京豆变动通知 #疯狂的joy #监控crazyJoy分红 #京东排行榜 #领京豆额外奖励 #京东保价 #闪购盲盒 #新潮品牌狂欢 #京喜领88元红包
//           cronExpression: "0 30 7 * * * *"
//           argument: jd_bean_change.js & jd_crazy_joy.js & jd_crazy_joy_bonus.js & jd_rankingList.js & jd_bean_home.js & jd_price.js & jd_sgmh.js & jd_mcxhd.js & jd_jxlhb.js

$exec('node jd_jxlhb.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_mcxhd.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_sgmh.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_price.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_bean_home.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_rankingList.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_crazy_joy_bonus.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_crazy_joy.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_bean_change.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
