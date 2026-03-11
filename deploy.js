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
    console.log(`Deploying to: ${url.hostname}:${url.port}${url.pathname}`);
}

const { execSync } = require('child_process');
execSync('npx cds deploy --to postgres', { stdio: 'inherit', env: process.env });