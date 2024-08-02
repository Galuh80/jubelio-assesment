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
    }
];

module.exports = productRoutes;
