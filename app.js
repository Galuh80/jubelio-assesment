const Hapi = require('@hapi/hapi');
require('dotenv').config();
const productRoutes = require('./routes/ProductRoutes');

const init = async () => {
    const server = Hapi.server({
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    });

    server.route(productRoutes);

    await server.start();
    console.log(`Server running on port ${process.env.APP_PORT}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
