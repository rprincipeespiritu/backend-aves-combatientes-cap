// server.js
require('dotenv').config();
const cds = require('@sap/cds');
const cors = require('cors');

// Resolver DATABASE_URL de Railway para CAP
if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    process.env.DB_HOST = url.hostname;
    process.env.DB_PORT = url.port;
    process.env.DB_USER = url.username;
    process.env.DB_PASSWORD = url.password;
    process.env.DB_NAME = url.pathname.replace('/', '');
}

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};

cds.on('bootstrap', (app) => {
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); // preflight
});

module.exports = cds.server;