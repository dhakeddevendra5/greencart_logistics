// backend/src/controllers/simulationController.js
const { calculateSimulation } = require('../utils/kpiCalculator');
const driverModel = require('../models/driverModel');
const routeModel = require('../models/routeModel');
const orderModel = require('../models/orderModel');
const { saveSimulationResult } = require('../models/simulationResultModel');

const runSimulation = async (req, res, next) => {
  try {
    const { availableDrivers, startTime, maxHoursPerDriver } = req.body || {};

    // basic validation
    if (availableDrivers == null || !startTime || maxHoursPerDriver == null) {
      return res.status(400).json({ error: 'availableDrivers, startTime and maxHoursPerDriver required' });
    }
    if (availableDrivers <= 0) return res.status(400).json({ error: 'availableDrivers must be > 0' });

    const drivers = await driverModel.getDrivers();
    const routes = await routeModel.getRoutes();
    const orders = await orderModel.getOrders();

    // build routes map by route_id
    const routesMap = {};
    for (const r of routes) routesMap[r.route_id] = r;

    const simInput = { availableDrivers, startTime, maxHoursPerDriver };
    const simResult = calculateSimulation({ drivers, routesMap, orders, inputs: simInput });

    // persist
    const saved = await saveSimulationResult({
      input: simInput,
      results_json: simResult,
      summary: JSON.stringify(simResult.summary),
    });

    res.json({ saved, simResult });
  } catch (err) {
    next(err);
  }
};

module.exports = { runSimulation };
