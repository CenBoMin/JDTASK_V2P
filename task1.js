// - task1: #签到#东东超市兑换奖品 #摇京豆 #京东汽车兑换
//           cronExpression: "0 0 0 * * * *"
//           argument: jd_bean_sign.js & jd_blueCoin.js & jd_club_lottery.js & jd_car_exchange.js

$exec('node jd_bean_sign.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_blueCoin.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_club_lottery.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_car_exchange.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
