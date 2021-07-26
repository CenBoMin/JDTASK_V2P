// @grant nodejs
let jstask = $JDTASK
$exec(`node ${jstask}`, {
  cwd: 'script/JSFile', timeout: 0,
  env: {
    ...process.env,
    V2P_NOTIFY: `${__home}/logs/${__name.replace(/\//,"-")}.log`,
    JD_COOKIE: $store.get('CookiesJDV2P', 'string'),
    PLANT_BEAN_SHARECODES: $store.get('PlantBeanV2P', 'string'),
    DREAM_FACTORY_SHARE_CODES: $store.get('JxFactoryV2P', 'string'),
    DDFACTORY_SHARECODES: $store.get('JdFactoryV2P', 'string'),
    JDSGMH_SHARECODES: $store.get('JDSGMHV2P', 'string'),
    FRUITSHARECODES: $store.get('JDFruitV2P', 'string'),
    PETSHARECODES: $store.get('JdPetV2P', 'string'),
    CASH_EXCHANGE: true,JD_CASH_SHARECODES: $store.get('JDCashV2P', 'string'),
    JOY_RUN_HELP_MYSELF:true,
    HEALTH_EXCHANGE: 20,
    JOY_FEED_COUNT:80,
    summer_movement_ShHelpFlag:1,summer_movement_HelpHelpHelpFlag:true,
    JOY_HELP_FEED:true,jdJoyStealCoin:true,
    lsjdh: "jdAward3"
  },
  cb(data, error){
    error ? console.error(error) : console.log(data)
  }
})
