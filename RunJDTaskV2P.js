// @grant nodejs
let jstask = $JDTASK
$exec(`node ${jstask}`, {
  cwd: 'script/JSFile', timeout: 0,
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
