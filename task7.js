// - task7: #东东超市 #十元街 #翻翻乐
//           cronExpression: "0 15 */1 * * * *"
//           argument: jd_superMarket.js & jd_syj.js & jd_big_winner.js

$exec('node jd_big_winner.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_syj.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

$exec('node jd_superMarket.js', {
  cwd: 'script/JSFile', timeout: 0,
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
