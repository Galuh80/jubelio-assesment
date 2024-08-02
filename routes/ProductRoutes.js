const ProductController = require('../controllers/ProductController');

const productRoutes = [
    {
        method: 'GET',
        path: '/api/products',
        handler: ProductController.getAll,
        options: {
            tags: ['api'],
            description: 'Get all products',
            notes: 'Returns a list of all products'
        }
    },
    {
        method: 'GET',
        path: '/api/products/{id}',
        handler: ProductController.getById,
        options: {
            tags: ['api'],
            description: 'Get product',
            notes: 'Return a product'
        }
    },
    {
        method: 'POST',
        path: '/api/products',
        handler: ProductController.create,
        options: {
            tags: ['api'],
            description: 'Create product',
            notes: 'Return a product has been created'
        }
    },
    {
        method: 'PUT',
        path: '/api/products/{id}',
        handler: ProductController.update,
        options: {
            tags: ['api'],
            description: 'Update product',
            notes: 'Return a product has been updated'
        }
    },
    {
        method: 'DELETE',
        path: '/api/products/{id}',
        handler: ProductController.delete,
        options: {
            tags: ['api'],
            description: 'Delete product',
            notes: 'Delete a product'
        }
    }
];

module.exports = productRoutes;
