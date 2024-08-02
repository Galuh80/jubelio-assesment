const sql = require('../configurations/Database');
const axios = require('axios');

class Product {
    
    static async getAll() {
        return sql`SELECT * FROM products`;
    }

}

module.exports = Product;