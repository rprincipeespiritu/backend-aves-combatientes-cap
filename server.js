// server.js
require('dotenv').config();

// Parsear DATABASE_URL para RUNTIME (igual que deploy.js)
if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    process.env.CDS_REQUIRES_DB_KIND                 = 'postgres';
    process.env.CDS_REQUIRES_DB_IMPL                 = '@cap-js/postgres';
    process.env.CDS_REQUIRES_DB_CREDENTIALS_HOST     = url.hostname;
    process.env.CDS_REQUIRES_DB_CREDENTIALS_PORT     = url.port;
    process.env.CDS_REQUIRES_DB_CREDENTIALS_USER     = url.username;
    process.env.CDS_REQUIRES_DB_CREDENTIALS_PASSWORD = url.password;
    process.env.CDS_REQUIRES_DB_CREDENTIALS_DATABASE = url.pathname.replace('/', '');
}

const cds = require('@sap/cds'); // 👈 DESPUÉS del parseo
const cors = require('cors');

const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};

cds.on('bootstrap', (app) => {
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));
});

module.exports = cds.server;