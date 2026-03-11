// deploy.js
require('dotenv').config();

// Parsear DATABASE_URL ANTES del deploy
if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    process.env.PGHOST     = url.hostname;
    process.env.PGPORT     = url.port;
    process.env.PGUSER     = url.username;
    process.env.PGPASSWORD = url.password;
    process.env.PGDATABASE = url.pathname.replace('/', '');
    
    console.log(`Connecting to: ${url.hostname}:${url.port}/${url.pathname.replace('/', '')}`);
}

const { execSync } = require('child_process');
execSync('npx cds deploy --to postgres', { stdio: 'inherit' });