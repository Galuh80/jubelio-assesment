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

    static async getById(request, res) {
        try {
            const product = await Product.getProductDetails(request.params.id);
            if (!product) {
                return res.response({ error: 'Product not found' }).code(404);
            }
            return res.response(product).code(200);
        } catch (err) {
            console.error(err);
            return res.response({ error: 'Failed to retrieve product' }).code(500);
        }
    }

    static async create(request, res) {
        try {
            const newProduct = await Product.create(request.payload);
            return res.response(newProduct).code(201);
        } catch (err) {
            console.error(err);
            return res.response({ error: 'Failed to create product' }).code(500);
        }
    }

    static async update(request, res) {
        try {
            const updatedProduct = await Product.update(request.params.id, request.payload);
            if (!updatedProduct) {
                return res.response({ error: 'Product not found' }).code(404);
            }
            return res.response(updatedProduct).code(200);
        } catch (err) {
            console.error(err);
            return res.response({ error: 'Failed to update product' }).code(500);
        }
    }

    static async delete(request, res) {
        try {
            const deletedProduct = await Product.delete(request.params.id);
            if (!deletedProduct) {
                return res.response({ error: 'Product not found' }).code(404);
            }
            return res.response({ message: 'Product deleted successfully', product: deletedProduct }).code(200);
        } catch (err) {
            console.error(err);
            return res.response({ error: 'Failed to delete product' }).code(500);
        }
    }

}

module.exports = ProductController;