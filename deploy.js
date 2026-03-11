// deploy.js
require('dotenv').config();

if (process.env.DATABASE_URL) {
    const url = new URL(process.env.DATABASE_URL);
    
    // CAP lee estas variables CDS_ automáticamente
    process.env.CDS_REQUIRES_DB_KIND                    = 'postgres';
    process.env.CDS_REQUIRES_DB_IMPL                    = '@cap-js/postgres';
    process.env.CDS_REQUIRES_DB_CREDENTIALS_HOST        = url.hostname;
    process.env.CDS_REQUIRES_DB_CREDENTIALS_PORT        = url.port;
    process.env.CDS_REQUIRES_DB_CREDENTIALS_USER        = url.username;
    process.env.CDS_REQUIRES_DB_CREDENTIALS_PASSWORD    = url.password;
    process.env.CDS_REQUIRES_DB_CREDENTIALS_DATABASE    = url.pathname.replace('/', '');
    
    console.log(`Deploying to: ${url.hostname}:${url.port}${url.pathname}`);
}

const { execSync } = require('child_process');
// --to postgres = solo el KIND, no la URL completa
execSync('npx cds deploy --to postgres', { 
    stdio: 'inherit', 
    env: process.env 
});