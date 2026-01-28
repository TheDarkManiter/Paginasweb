const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const sqlFile = process.argv[2] || path.join(__dirname, '..', 'sql', '001_init.sql');

if (!fs.existsSync(sqlFile)) {
  console.error(`SQL file not found: ${sqlFile}`);
  process.exit(1);
}

const sql = fs.readFileSync(sqlFile, 'utf8');

const child = spawn(
  'docker',
  ['exec', '-i', 'fba_postgres', 'psql', '-U', 'fba', '-d', 'fba_dev', '-v', 'ON_ERROR_STOP=1'],
  { stdio: ['pipe', 'inherit', 'inherit'] }
);

child.stdin.write(sql);
child.stdin.end();

child.on('exit', (code) => {
  if (code !== 0) {
    console.error(`psql exited with code ${code}`);
  }
  process.exit(code ?? 0);
});
