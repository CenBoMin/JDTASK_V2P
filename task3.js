// @grant nodejs
//pycookie转换
$exec('node JDTaskV2P.pycookie.js', {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    CookiesJDV2P: $store.get('CookiesJDV2P', 'string'),
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
// #宠汪汪
$exec('node jd_joy_new.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
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
// #东东工厂
$exec('node jd_jdfactory.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    DDFACTORY_SHARECODES: $store.get('JdFactoryV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
// #京喜工厂
$exec('node jd_dreamFactory.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    DREAM_FACTORY_SHARE_CODES: $store.get('JxFactoryV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
//#京东种豆得豆
$exec('node jd_plantBean.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    PLANT_BEAN_SHARECODES: $store.get('PlantBeanV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
// @grant nodejs
// #摇钱树
$exec('node jd_moneyTree.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
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
// #电竞经理
$exec('node jd_EsportsManager.js', {
  cwd: 'script/JSFile/jd_scripts', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string')
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
