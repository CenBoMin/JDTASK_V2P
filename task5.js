// - task5: #京东全民开红包 #进店领豆 #取关京东店铺商品 #京东汽车 #京东秒秒币
//           cronExpression: "0 10 0 * * * *"
//           argument: jd_redPacket.js & jd_shop.js & jd_unsubscribe.js & jd_car.js & jd_ms.js

$exec('node jd_ms.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_car.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_unsubscribe.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_shop.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_redPacket.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
