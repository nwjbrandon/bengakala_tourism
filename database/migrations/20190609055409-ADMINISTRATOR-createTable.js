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
  return db.createTable('ADMINISTRATOR', {
    uuid: {
      type: 'string',
      unique: true,
      notNull: true,
      primaryKey: true,
    },
    username: {
      type: 'string',
      notNull: true,
    },
    email: {
      type: 'string',
      notNull: true,
    },
    password: {
      type: 'string',
      notNull: true,
    },
    phone: {
      type: 'string',
      notNull: true,
    },
    jobTitle: {
      type: 'string',
      notNull: true,
    },
    createdAt: {
      type: 'timestamp',
      defaultValue: new String('now()'),
      notNull: true,
    },
    edit: {
      type: 'boolean',
      notNull: true,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('ADMINISTRATOR');
};

exports._meta = {
  "version": 1
};
