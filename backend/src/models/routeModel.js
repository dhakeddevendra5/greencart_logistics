// backend/src/models/routeModel.js
const pool = require('../config/db');

const createRoute = async (route) => {
  const { route_id, distance_km, traffic_level = 'Normal', base_time_minutes } = route;
  const { rows } = await pool.query(
    `INSERT INTO routes (route_id, distance_km, traffic_level, base_time_minutes) VALUES ($1,$2,$3,$4) RETURNING *`,
    [route_id, distance_km, traffic_level, base_time_minutes]
  );
  return rows[0];
};

const getRoutes = async () => {
  const { rows } = await pool.query(`SELECT * FROM routes ORDER BY id`);
  return rows;
};

const getRouteById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM routes WHERE id=$1`, [id]);
  return rows[0];
};

const updateRoute = async (id, fields) => {
  const keys = Object.keys(fields);
  const vals = Object.values(fields);
  const set = keys.map((k, i) => `${k}=$${i + 1}`).join(', ');
  const { rows } = await pool.query(
    `UPDATE routes SET ${set} WHERE id=$${keys.length + 1} RETURNING *`,
    [...vals, id]
  );
  return rows[0];
};

const deleteRoute = async (id) => {
  await pool.query(`DELETE FROM routes WHERE id=$1`, [id]);
  return true;
};

module.exports = { createRoute, getRoutes, getRouteById, updateRoute, deleteRoute };
