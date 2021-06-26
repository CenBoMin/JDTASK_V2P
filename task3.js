// - task3: #宠汪汪 #摇钱树 #京东种豆得豆 #京喜工厂 #东东工厂 #电竞经理
//           cronExpression: "0 3 */1 * * * *"
//           argument: jd_joy_new.js & jd_moneyTree.js & jd_plantBean.js & jd_dreamFactory.js & jd_jdfactory.js & jd_EsportsManager.js

$exec('node jd_EsportsManager.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_jdfactory.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_dreamFactory.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_plantBean.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_moneyTree.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_joy_new.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
