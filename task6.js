// - timer: #天天提鹅 #京喜牧场
//           cronExpression: "0 8 */3 * * * *"
//           argument: jd_daily_egg.js & jd_jxmc.js

$exec('node jd_jxmc.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_daily_egg.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
