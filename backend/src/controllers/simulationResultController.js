// backend/src/controllers/simulationResultController.js
const { getSimulationHistory } = require('../models/simulationResultModel');

const listHistory = async (req, res, next) => {
  try {
    const rows = await getSimulationHistory();
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

module.exports = { listHistory };
