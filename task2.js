// @grant nodejs
//#特务Zxjd_productZ4Brand.js
$exec('node https://raw.githubusercontent.com/star261/jd/main/scripts/jd_productZ4Brand.js', {
  cwd: 'script/JSFile/faker2', timeout: 0,
  env: {
    ...process.env,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
//#东东健康社区jd_health.js
$exec('node jd_health.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    // JDHEALTH_SHARECODES: $store.get('JDFruitV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})

// @grant nodejs
//#金榜创造营
$exec('node jd_gold_creator.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// // @grant nodejs
// //#京东家庭号
// $exec('node jd_family.js', {
//   cwd: 'script/JSFile/sync', timeout: 0,
//   env: {
//     ...process.env,
//     V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
//     JD_COOKIE: $store.get('CookiesJDV2P', 'string')
//   },
//   cb(data, error){
//     error ? console.error(error) : console.log(data)
//   }
// })
// @grant nodejs
//#京东极速版签到
$exec('node jd_speed_sign.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
//#东东农场
$exec('node jd_fruit.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    FRUITSHARECODES: $store.get('JDFruitV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
//#东东萌宠
$exec('node jd_pet.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    PETSHARECODES: $store.get('JdPetV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
//#口袋书店
$exec('node jd_bookshop.js', {
  cwd: 'script/JSFile/sync', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
//#京喜农场
// $exec('node jd_jxnc.js', {
//   cwd: 'script/JSFile/jd_scripts', timeout: 0,
//   env: {
//     ...process.env,
//     V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
//     JD_COOKIE: $store.get('CookiesJDV2P', 'string')
//   },
//   cb(data, error){
//     error ? console.error(error) : console.log(data)
//   }
// })
