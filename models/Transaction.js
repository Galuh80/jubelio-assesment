const sql = require('../configurations/Database');
const Pagination = require('../helpers/Pagination');

class Transaction {

    static async getAll(page = 1, pageSize = 10) {
        const pagination = new Pagination(page, pageSize);
        const offset = pagination.getOffset();
        const limit = pagination.getLimit();
    
        const transactions = await sql`
            SELECT 
                at.id, 
                p.sku AS product_id, 
                at.qty, 
                at.amount 
            FROM transactions at
            JOIN products p ON at.product_id = p.id
            ORDER BY at.id
            LIMIT ${limit}
            OFFSET ${offset}
        `;
    
        const totalCountResult = await sql`
            SELECT COUNT(*) AS count FROM transactions
        `;
        const totalCount = totalCountResult[0].count;
    
        return {
            data: transactions.map(transaction => ({
                id: transaction.id,
                sku: transaction.product_id,
                qty: transaction.qty,
                amount: transaction.amount
            })),
            meta: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
                perPage: limit
            }
        };
    }    

    static async getTransactionDetails(id) {
        const transaction = await sql`
            SELECT 
                at.id, 
                p.sku AS product_id, 
                at.qty, 
                at.amount 
            FROM transactions at
            JOIN products p ON at.product_id = p.id
            WHERE at.id = ${id}
        `;
    
        if (transaction.length === 0) return null;
    
        const transactionData = transaction[0];
        
        return {
            id: transactionData.id,
            sku: transactionData.product_id,
            qty: transactionData.qty,
            amount: transactionData.amount
        };
    }
    
    static async create(data) {
        const { product_id, qty } = data;
    
        try {
            await sql.begin(async (trx) => {
                const [product] = await trx`
                    SELECT price, stock 
                    FROM products 
                    WHERE id = ${product_id}
                `;
    
                if (!product) {
                    throw new Error('Product not found');
                }
    
                if (product.stock <= 0) {
                    throw new Error('Cannot create transaction for product with zero stock');
                }
    
                if (product.stock < qty) {
                    throw new Error('Insufficient stock for the transaction');
                }
    
                const amount = qty * product.price;
    
                const [transaction] = await trx`
                    INSERT INTO transactions (product_id, qty, amount)
                    VALUES (${product_id}, ${qty}, ${amount})
                    RETURNING *
                `;
    
                await trx`
                    UPDATE products 
                    SET stock = stock - ${qty}
                    WHERE id = ${product_id}
                `;
    
                return transaction;
            });
        } catch (err) {
            throw new Error('Transaction failed: ' + err.message);
        }
    }
    
    static async update(id, data) {
        const { qty } = data;
    
        try {
            await sql.begin(async (trx) => {
                const [existingTransaction] = await trx`
                    SELECT product_id, qty 
                    FROM transactions 
                    WHERE id = ${id}
                `;
    
                if (!existingTransaction) {
                    throw new Error('Transaction not found');
                }
    
                const { product_id: oldProductId, qty: oldQty } = existingTransaction;
    
                const [product] = await trx`
                    SELECT price, stock 
                    FROM products 
                    WHERE id = ${oldProductId}
                `;
    
                if (!product) {
                    throw new Error('Product not found');
                }
    
                if (product.stock + oldQty < qty) {
                    throw new Error('Insufficient stock for the transaction');
                }
    
                const amount = qty * product.price;

                await trx`
                    UPDATE transactions
                    SET qty = ${qty}, amount = ${amount}
                    WHERE id = ${id}
                `;
    
                await trx`
                    UPDATE products
                    SET stock = stock + ${oldQty} - ${qty}
                    WHERE id = ${oldProductId}
                `;    
            });
            return true;
        } catch (err) {
            throw new Error('Update failed: ' + err.message);
        }
    }
    
    static async delete(id) {
        try {
            const result = await sql.begin(async (trx) => {
                const [transaction] = await trx`
                    DELETE FROM transactions
                    WHERE id = ${id}
                    RETURNING *
                `;

                return transaction;
            });

            return result;
        } catch (err) {
            throw new Error('Transaction failed: ' + err.message);
        }
    }
    
}

module.exports = Transaction;