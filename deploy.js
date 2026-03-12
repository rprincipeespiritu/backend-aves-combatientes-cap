const { execSync } = require('child_process')

try {
  execSync('npx cds deploy --to postgres', {
    stdio: 'inherit',
    env: process.env
  })
  console.log('Database deployed successfully')
} catch (err) {
  console.error('Deploy error:', err)
  process.exit(1)
}