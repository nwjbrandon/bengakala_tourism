'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.removeColumn('TRANSACTIONS', 'phone');
};

exports.down = function(db) {
  return db.addColumn('TRANSACTIONS', 'phone',
      {
        type: 'string',
        defaultValue: '',
      });
};

exports._meta = {
  "version": 1
};
