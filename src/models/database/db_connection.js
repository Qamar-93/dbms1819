const { Pool } = require('pg');
let url = '';
if (!process.env.DATABASE_URL) {
  throw new Error('No DATABASE_URL provided');
}

if (process.env.NODE_ENV === 'test') {
  url = process.env.TEST_URL;
} else {
  url = process.env.DATABASE_URL;
}

const pool = new Pool({
connectionString: url,
 ssl: true });
module.exports = pool;
