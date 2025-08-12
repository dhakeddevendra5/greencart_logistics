// backend/src/models/simulationResultModel.js
const pool = require('../config/db');

const saveSimulationResult = async (payload) => {
  // payload: { input, results_json, summary, timestamp }
  const { input, results_json, summary } = payload;
  const { rows } = await pool.query(
    `INSERT INTO simulation_results (input, results_json, summary, created_at) VALUES ($1,$2,$3,NOW()) RETURNING *`,
    [input, results_json, summary]
  );
  return rows[0];
};

const getSimulationHistory = async () => {
  const { rows } = await pool.query(`SELECT * FROM simulation_results ORDER BY created_at DESC`);
  return rows;
};

module.exports = { saveSimulationResult, getSimulationHistory };
