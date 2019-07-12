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
  return db.createTable('EXCLUDED_DATES', {
    uuid: {
      type: 'string',
      unique: true,
      notNull: true,
      primaryKey: true,
    },
    date: {
      type: 'datetime',
      notNull: true,
    },
    value: {
      type: 'int',
      defaultValue: 1,
    },
    createdAt: {
      type: 'timestamp',
      defaultValue: new String('now()'),
      notNull: true,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('EXCLUDED_DATES');
};

exports._meta = {
  "version": 1
};
