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
  return db.createTable('products', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    title: { type: 'string', length: 255, notNull: true },
    description: { type: 'text' },
    category: { type: 'string', length: 50 },
    price: { type: 'decimal', precision: 10, scale: 2 },
    discount_percentage: { type: 'decimal', precision: 5, scale: 2 },
    rating: { type: 'decimal', precision: 3, scale: 2 },
    stock: { type: 'int' },
    brand: { type: 'string', length: 100 },
    sku: { type: 'string', length: 50 },
    weight: { type: 'decimal', precision: 10, scale: 2 },
    warranty_information: { type: 'text' },
    shipping_information: { type: 'text' },
    availability_status: { type: 'string', length: 50 },
    return_policy: { type: 'text' },
    minimum_order_quantity: { type: 'int' },
    thumbnail: { type: 'string', length: 255 }
  });
};

exports.down = function(db) {
  return db.dropTable('products');
};

exports._meta = {
  "version": 1
};
