// backend/src/models/userModel.js
const pool = require('../config/db');

const createUser = async ({ username, passwordHash, role = 'manager' }) => {
  const { rows } = await pool.query(
    `INSERT INTO users (username, password_hash, role) VALUES ($1,$2,$3) RETURNING id, username, role`,
    [username, passwordHash, role]
  );
  return rows[0];
};

const findUserByUsername = async (username) => {
  const { rows } = await pool.query(
    `SELECT id, username, password_hash, role FROM users WHERE username=$1`,
    [username]
  );
  return rows[0];
};

module.exports = { createUser, findUserByUsername };
