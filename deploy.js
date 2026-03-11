// deploy.js
require('dotenv').config();

if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    process.env.PGHOST     = url.hostname;
    process.env.PGPORT     = url.port;
    process.env.PGUSER     = url.username;
    process.env.PGPASSWORD = url.password;
    process.env.PGDATABASE = url.pathname.replace('/', '');
}

const { execSync } = require('child_process');

const { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } = process.env;
const connectionUrl = `postgres://${PGUSER}:${encodeURIComponent(PGPASSWORD)}@${PGHOST}:${PGPORT}/${PGDATABASE}`;

console.log(`Deploying to: ${PGHOST}:${PGPORT}/${PGDATABASE}`);

// Deploy con URL directa — evita leer package.json credentials
execSync(`npx cds deploy --to ${connectionUrl}`, { 
    stdio: 'inherit',
    env: process.env
});