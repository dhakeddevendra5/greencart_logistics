// backend/src/config/db.js
const { Pool } = require('pg');
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = new Pool({
  host: DB_HOST || 'localhost',
  port: DB_PORT ? parseInt(DB_PORT) : 5432,
  user: DB_USER || 'postgres',
  password: DB_PASSWORD || '123',
  database: DB_NAME || 'greencart',
});

pool.on('error', (err) => {
  console.error('Unexpected DB error', err);
  process.exit(-1);
});

module.exports = pool;
