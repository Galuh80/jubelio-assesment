const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
require('dotenv').config();
const productRoutes = require('./routes/ProductRoutes');
const transactionRoutes = require('./routes/TransactionRoutes');

const init = async () => {
    const server = Hapi.server({
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    });

    const swaggerOptions = {
        info: {
            title: 'Jubelio Assessment Simple Transaction API with Swagger',
            version: '0.1.0',
            description: 'This is a simple CRUD API application made with NodeJS, HapiJS and documented with Swagger',
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    server.route(productRoutes);
    server.route(transactionRoutes);

    await server.start();
    console.log(`Server running on port ${process.env.APP_PORT}`);
    console.log(`Swagger documentation available at ${server.info.uri}/documentation`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
