// backend/src/controllers/driverController.js
const driverModel = require('../models/driverModel');

const createDriver = async (req, res, next) => {
  try {
    const d = await driverModel.createDriver(req.body);
    res.json(d);
  } catch (err) {
    next(err);
  }
};

const listDrivers = async (req, res, next) => {
  try {
    const drivers = await driverModel.getDrivers();
    res.json(drivers);
  } catch (err) {
    next(err);
  }
};

const getDriver = async (req, res, next) => {
  try {
    const driver = await driverModel.getDriverById(req.params.id);
    if (!driver) return res.status(404).json({ error: 'driver not found' });
    res.json(driver);
  } catch (err) {
    next(err);
  }
};

const updateDriver = async (req, res, next) => {
  try {
    const updated = await driverModel.updateDriver(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteDriver = async (req, res, next) => {
  try {
    await driverModel.deleteDriver(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { createDriver, listDrivers, getDriver, updateDriver, deleteDriver };
