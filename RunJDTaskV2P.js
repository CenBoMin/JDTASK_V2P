// @grant nodejs
let jstask = $JDTASK
$exec(`node ${jstask}`, {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    //基础变量
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    //账号互助变量
    PLANT_BEAN_SHARECODES: $store.get('PlantBeanV2P', 'string'),
    DREAM_FACTORY_SHARE_CODES: $store.get('JxFactoryV2P', 'string'),
    DDFACTORY_SHARECODES: $store.get('JdFactoryV2P', 'string'),
    JDSGMH_SHARECODES: $store.get('JDSGMHV2P', 'string'),
    FRUITSHARECODES: $store.get('JDFruitV2P', 'string'),
    PETSHARECODES: $store.get('JdPetV2P', 'string'),
    CASH_EXCHANGE: true,JD_CASH_SHARECODES: $store.get('JDCashV2P', 'string'),
    //cdlejd_study 脚本变量
    angryBeanPins: $store.get('PtPinJDV2P', 'string'),
    cashHelpPins: $store.get('PtPinJDV2P', 'string'),
    kois: $store.get('PtPinJDV2P', 'string'),
    exchangeAccounts: $store.get('PtPinJDV2P', 'string'),
    earn30Pins: $store.get('PtPinJDV2P', 'string'),
    dyjHelpPins: $store.get('PtPinJDV2P', 'string'),
    enableAngryBeanNotify: false,
    //宠汪汪赛跑助力
    JOY_RUN_HELP_MYSELF:true,
    //京东健康兑换20豆
    HEALTH_EXCHANGE: 20,
    //超市兑换20豆
    MARKET_COIN_TO_BEANS:20,
    //宠汪汪喂食80g
    JOY_FEED_COUNT:80,
    //燃动夏季助力
    summer_movement_ShHelpFlag:1,summer_movement_HelpHelpHelpFlag:true,
    //下面的忘记了...
    JOY_HELP_FEED:true,
    jdJoyStealCoin:true
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
