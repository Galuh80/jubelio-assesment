require('dotenv').config();
const postgres = require('postgres');

class Database {
    
    constructor() {
        this.sql = postgres({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
        });
    }

    async connect() {
        try {
            await this.sql`SELECT 1`;
            console.log('Database connection established successfully');
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        }
    }
}

const db = new Database();
db.connect();

module.exports = db.sql;
