// backend/src/controllers/orderController.js
const orderModel = require('../models/orderModel');

const createOrder = async (req, res, next) => {
  try {
    const o = await orderModel.createOrder(req.body);
    res.json(o);
  } catch (err) {
    next(err);
  }
};

const listOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.getOrders();
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const order = await orderModel.getOrderById(req.params.id);
    if (!order) return res.status(404).json({ error: 'order not found' });
    res.json(order);
  } catch (err) {
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const updated = await orderModel.updateOrder(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    await orderModel.deleteOrder(req.params.id);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

module.exports = { createOrder, listOrders, getOrder, updateOrder, deleteOrder };
