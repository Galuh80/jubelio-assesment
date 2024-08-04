const TransactionController = require('../controllers/TransactionController');

const transactionRoutes = [
    {
        method: 'GET',
        path: '/api/transactions',
        handler: TransactionController.getAll,
        options: {
            tags: ['api'],
            description: 'Get all transactions',
            notes: 'Returns a list of all transactions'
        }
    },
    {
        method: 'GET',
        path: '/api/transactions/{id}',
        handler: TransactionController.getById,
        options: {
            tags: ['api'],
            description: 'Get transaction',
            notes: 'Return a transaction'
        }
    },
    {
        method: 'POST',
        path: '/api/transactions',
        handler: TransactionController.create,
        options: {
            tags: ['api'],
            description: 'Create transaction',
            notes: 'Return a transaction has been created'
        }
    },
    {
        method: 'PUT',
        path: '/api/transactions/{id}',
        handler: TransactionController.update,
        options: {
            tags: ['api'],
            description: 'Update transaction',
            notes: 'Return a transaction has been updated'
        }
    },
    {
        method: 'DELETE',
        path: '/api/transactions/{id}',
        handler: TransactionController.delete,
        options: {
            tags: ['api'],
            description: 'Delete transaction',
            notes: 'Return a transaction has been deleted'
        }
    }
]

module.exports = transactionRoutes;