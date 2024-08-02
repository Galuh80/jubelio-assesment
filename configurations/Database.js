require('dotenv').config();
const postgres = require('postgres');

class Database {

    async connection() {
        try {
            const sql = postgres({
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                database: process.env.DB_NAME,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
            });

            await sql`SELECT 1`;
            console.log('Database connection established successfully');
        } catch (err) {
            console.error('Failed to connect to the database:', err);
        }
    }
    
}

//const db = new Database();
//db.connection();
