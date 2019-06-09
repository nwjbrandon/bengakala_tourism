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
  return db.createTable('INFORMATION', {
    uuid: {
      type: 'string',
      unique: true,
      notNull: true,
      primaryKey: true,
    },
    heading: {
      type: 'string',
      defaultValue: '',
    },
    subheading: {
      type: 'string',
      defaultValue: '',
    },
    paragraph: {
      type: 'text',
    },
    subparagraph: {
      type: 'text',
    },
    title: {
      type: 'string',
      defaultValue: '',
    },
    text: {
      type: 'text',
    },
    quantity: {
      type: 'int',
      defaultValue: -1,
    },
    quantityString: {
      type: 'string',
      defaultValue: '-1',
    },
    prices: {
      type: 'decimal',
      defaultValue: -1,
    },
    pricesString: {
      type: 'string',
      defaultValue: '-1',
    },
    imgUrl: {
      type: 'string',
      defaultValue: '',
    },
    createdAt: {
      type: 'timestamp',
      defaultValue: new String('now()'),
      notNull: true,
    },
    type: {
      type: 'string',
      notNull: true,
    },
    edit: {
      type: 'boolean',
      notNull: true,
    },
  });
};

exports.down = function(db) {
  return db.dropTable('INFORMATION');
};

exports._meta = {
  "version": 1
};
