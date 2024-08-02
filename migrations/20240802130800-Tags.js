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
  return db.createTable('tags', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    product_id: { type: 'int', notNull: true, foreignKey: {
      name: 'tags_product_id_fk',
      table: 'products',
      mapping: 'id',
      onDelete: 'CASCADE'
    }},
    tag: { type: 'string', length: 50 }
  });
};

exports.down = function(db) {
  return db.dropTable('tags');
};

exports._meta = {
  "version": 1
};
