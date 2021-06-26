// - task9: #金融养猪 #京东快递 #京东赚赚 #京东极速版红包 #领金贴
//           cronExpression: "0 3 1 * * * *"
//           argument: jd_pigPet.js & jd_kd.js & jd_jdzz.js & jd_speed_redpocke.js & jd_jin_tie.js

$exec('node jd_jin_tie.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_speed_redpocke.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_jdzz.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_kd.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_pigPet.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
