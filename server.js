// server.js
require('dotenv').config();
const cds = require('@sap/cds');
const cors = require('cors');

// Resolver DATABASE_URL de Railway para CAP
if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    process.env.PGHOST = url.hostname;
    process.env.PGPORT = url.port;
    process.env.PGUSER = url.username;
    process.env.PGPASSWORD = url.password;
    process.env.PGDATABASE = url.pathname.replace('/', '');
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