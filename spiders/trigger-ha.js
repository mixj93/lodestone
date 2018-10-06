const { heartharena } = require('./heartharena');

(async() => {
  await heartharena('druid');
  await heartharena('hunter');
  await heartharena('mage');
  await heartharena('paladin');
  await heartharena('priest');
  await heartharena('rogue');
  await heartharena('shaman');
  await heartharena('warlock');
  await heartharena('warrior');
})();
