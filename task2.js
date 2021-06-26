// - task2: #东东农场 #东东萌宠 #口袋书店 #京喜农场 #京东极速版签到 #京东家庭号 #金榜创造营 #明星小店
//           cronExpression: "0 5 6-18/6,8 * * * *"
//           argument: jd_fruit.js & jd_pet.js & jd_bookshop.js & jd_jxnc.js & jd_speed_sign.js & jd_family.js & jd_gold_creator.js & jd_star_shop.js
$exec('node jd_star_shop.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_gold_creator.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_family.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_speed_sign.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_fruit.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_pet.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_bookshop.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_jxnc.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
