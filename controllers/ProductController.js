const Product = require('../models/Product');

class ProductController {

    static async getAll(request, res) {
        try {
            const products = await Product.getAll();
            return res.response(products).code(200);
        } catch (err) {
            console.error(err);
            return res.response({ error: 'Failed to retrieve products' }).code(500);
        }
    }

}

module.exports = ProductController;