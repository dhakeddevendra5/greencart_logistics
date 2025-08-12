// backend/src/controllers/routeController.js
const routeModel = require('../models/routeModel');

const createRoute = async (req, res, next) => {
  try {
    const r = await routeModel.createRoute(req.body);
    res.json(r);
  } catch (err) {
    next(err);
  }
};

const listRoutes = async (req, res, next) => {
  try {
    const routes = await routeModel.getRoutes();
    res.json(routes);
  } catch (err) {
    next(err);
  }
};

const getRoute = async (req, res, next) => {
  try {
    const route = await routeModel.getRouteById(req.params.id);
    if (!route) return res.status(404).json({ error: 'route not found' });
    res.json(route);
  } catch (err) {
    next(err);
  }
};

const updateRoute = async (req, res, next) => {
  try {
    const updated = await routeModel.updateRoute(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteRoute = async (req, res, next) => {
  try {
    await routeModel.deleteRoute(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { createRoute, listRoutes, getRoute, updateRoute, deleteRoute };
