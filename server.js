require('dotenv').config();

if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    const fs = require('fs');
    
    const cdsrc = {
        requires: {
            db: {
                kind: 'postgres',
                impl: '@cap-js/postgres',
                credentials: {
                    host: url.hostname,
                    port: parseInt(url.port),
                    user: url.username,
                    password: url.password,
                    database: url.pathname.replace('/', '')
                }
            }
        }
    };
    fs.writeFileSync('.cdsrc.json', JSON.stringify(cdsrc, null, 2));
    console.log(`DB config written for: ${url.hostname}:${url.port}${url.pathname}`);
}

const cds = require('@sap/cds'); // DESPUÉS de escribir .cdsrc.json

const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
};

cds.on('bootstrap', (app) => {
    const cors = require('cors');
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));
});

(async () => {
  try {
    const cds = require('@sap/cds')
    await cds.deploy()
    console.log("Database deployed successfully")
  } catch (err) {
    console.error("Deploy error:", err)
  }
})()

module.exports = cds.server;