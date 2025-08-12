// backend/src/models/driverModel.js
const pool = require('../config/db');

const createDriver = async (driver) => {
  const { name, current_shift_hours = 0, past_7_days_hours = '{}' } = driver;
  const { rows } = await pool.query(
    `INSERT INTO drivers (name, current_shift_hours, past_7_days_hours) VALUES ($1,$2,$3) RETURNING *`,
    [name, current_shift_hours, past_7_days_hours]
  );
  return rows[0];
};

const getDrivers = async () => {
  const { rows } = await pool.query(`SELECT * FROM drivers ORDER BY id`);
  return rows;
};

const getDriverById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM drivers WHERE id=$1`, [id]);
  return rows[0];
};

const updateDriver = async (id, fields) => {
  // simple update builder
  const keys = Object.keys(fields);
  const vals = Object.values(fields);
  const set = keys.map((k, i) => `${k}=$${i + 1}`).join(', ');
  const { rows } = await pool.query(
    `UPDATE drivers SET ${set} WHERE id=$${keys.length + 1} RETURNING *`,
    [...vals, id]
  );
  return rows[0];
};

const deleteDriver = async (id) => {
  await pool.query(`DELETE FROM drivers WHERE id=$1`, [id]);
  return true;
};

module.exports = { createDriver, getDrivers, getDriverById, updateDriver, deleteDriver };
