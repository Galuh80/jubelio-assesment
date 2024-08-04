const Transaction = require('../models/Transaction');

class TransactionController {
    
    static async getAll(request, res) {
        try {
            const transactions = await Transaction.getAll();
            return res.response(transactions).code(200);
        } catch (err) {
            console.error(err);
            return res.response({ error: 'Failed to retrieve transactions' }).code(500);
        }
    }

    static async getById(request, res) {
        try {
            const transaction = await Transaction.getTransactionDetails(request.params.id);
            if (!transaction) {
                return res.response({ error: 'Transaction not found' }).code(404);
            }
            return res.response(transaction).code(200);
        } catch (err) {
            console.error(err);
            return res.response({ error: 'Failed to retrieve transaction' }).code(500);
        }
    }

    static async create(request, res) {
        try {
            const newTransaction = await Transaction.create(request.payload);
            return res.response(newTransaction).code(201);
        } catch (err) {
            console.error(err);
            return res.response({ error: 'Failed to create transaction' }).code(500);
        }
    }

    static async update(request, res) {
        try {
            const { id } = request.params;
            await Transaction.update(id, request.payload);
            
            const transactionDetails = await Transaction.getTransactionDetails(id);
    
            if (!transactionDetails) {
                return res.response({ error: 'Transaction not found' }).code(404);
            }
    
            return res.response(transactionDetails).code(200);
        } catch (err) {
            console.error(err);
            if (err.message.includes('Transaction not found')) {
                return res.response({ error: 'Transaction not found' }).code(404);
            }
            return res.response({ error: 'Failed to update transaction' }).code(500);
        }
    }
    

    static async delete(request, res) {
        try {
            const deletedTransaction = await Transaction.delete(request.params.id);
            if (!deletedTransaction) {
                return res.response({ error: 'Transaction not found' }).code(404);
            }
            return res.response({ message: 'Transaction deleted successfully', product: deletedTransaction }).code(200);
        } catch (err) {
            console.error(err);
            return res.response({ error: 'Failed to delete transaction' }).code(500);
        }
    }
}

module.exports = TransactionController;