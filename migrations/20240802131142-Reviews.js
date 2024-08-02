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
  return db.createTable('reviews', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    product_id: { type: 'int', notNull: true, foreignKey: {
      name: 'reviews_product_id_fk',
      table: 'products',
      mapping: 'id',
      onDelete: 'CASCADE'
    }},
    rating: { type: 'int' },
    comment: { type: 'text' },
    date: { type: 'timestamp' },
    reviewer_name: { type: 'string', length: 100 },
    reviewer_email: { type: 'string', length: 100 }
  });
};

exports.down = function(db) {
  return db.dropTable('reviews');
};

exports._meta = {
  "version": 1
};
