opencardTask();
function opencardTask() {
  for (let i = 0; i < 3; i++) {
    (function (i) {
      setTimeout(function () {
        if (i == 0) {
          console.log("⬇️ 下载最新的py文件:jd_OpenCard.py");
          $download('https://ghproxy.com/https://raw.githubusercontent.com/curtinlv/JD-Script/main/OpenCard/jd_OpenCard.py', {
            folder: 'script/Shell',
            name: 'jd_OpenCard.py'
          }).then(d=> console.log("✅ Py文件已下载成功")).catch(e=>console.error(e))
        }else if (i == 2) {
          console.log("⏳ 开始执行【JD入会领豆】,3豆即入会")
          $exec('python3 -u jd_OpenCard.py', {
            cwd: 'script/Shell', timeout: 0,
            env: {
              JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
              openCardBean: 3,
              memory: false
            },
            cb(data, error){
              error ? console.error(error) : console.log(data)
            }
          })
        }
      },(i + 1) * 4000);
    })(i);
  }
}
