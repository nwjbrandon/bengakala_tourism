import RethinkdbStorage from './rethinkdb';

const rdb = new RethinkdbStorage("Brandon");
const rdb2 = new RethinkdbStorage("Brandon2");

module.exports = {
  r1: rdb,
  r2: rdb2,
};

