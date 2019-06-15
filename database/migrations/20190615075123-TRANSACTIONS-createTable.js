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
  return db.createTable('TRANSACTIONS', {
    uuid: {
      type: 'string',
      unique: true,
      notNull: true,
      primaryKey: true,
    },
    firstName: {
      type: 'string',
      notNull: true
    },
    lastName: {
      type: 'string',
      notNull: true
    },
    email: {
      type: 'string',
      notNull: true
    },
    phone: {
      type: 'string',
      defaultValue: '',
    },
    country: {
      type: 'string',
      defaultValue: '',
    },
    dateFrom: {
      type: 'datetime',
      notNull: true,
    },
    dateTo: {
      type: 'datetime',
      notNull: true,
    },
    breakfast: {
      type: 'boolean',
      defaultValue: false,
    },
    lunch: {
      type: 'boolean',
      defaultValue: false,
    },
    dinner: {
      type: 'boolean',
      defaultValue: false,
    },
    males: {
      type: 'string',
      notNull: true,
    },
    females: {
      type: 'string',
      notNull: true,
    },
    cars: {
      type: 'string',
      defaultValue: '0',
    },
    van: {
      type: 'string',
      defaultValue: '0',
    },
    motorbikes: {
      type: 'string',
      defaultValue: '0',
    },
    createdAt: {
      type: 'timestamp',
      defaultValue: new String('now()'),
      notNull: true,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('TRANSACTIONS');
};

exports._meta = {
  "version": 1
};
