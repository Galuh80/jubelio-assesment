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
  return db.createTable('metas', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    product_id: { type: 'int', notNull: true, foreignKey: {
      name: 'metas_product_id_fk',
      table: 'products',
      mapping: 'id',
      onDelete: 'CASCADE'
    }},
    barcode: { type: 'string', length: 50 },
    qr_code: { type: 'string', length: 255 },
    created_at: { type: 'timestamp' },
    updated_at: { type: 'timestamp' }
  });
};

exports.down = function(db) {
  return db.dropTable('metas');
};

exports._meta = {
  "version": 1
};
