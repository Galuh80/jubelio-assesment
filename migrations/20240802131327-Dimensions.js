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
  return db.createTable('dimensions', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    product_id: { type: 'int', notNull: true, foreignKey: {
      name: 'dimensions_product_id_fk',
      table: 'products',
      mapping: 'id',
      onDelete: 'CASCADE'
    }},
    width: { type: 'decimal', precision: 10, scale: 2 },
    height: { type: 'decimal', precision: 10, scale: 2 },
    depth: { type: 'decimal', precision: 10, scale: 2 }
  });
};

exports.down = function(db) {
  return db.dropTable('dimensions');
};

exports._meta = {
  "version": 1
};
