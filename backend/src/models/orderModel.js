// backend/src/models/orderModel.js
const pool = require('../config/db');

const createOrder = async (order) => {
  const { order_id, value_rs, assigned_route_id, delivery_timestamp = null } = order;
  const { rows } = await pool.query(
    `INSERT INTO orders (order_id, value_rs, assigned_route_id, delivery_timestamp) VALUES ($1,$2,$3,$4) RETURNING *`,
    [order_id, value_rs, assigned_route_id, delivery_timestamp]
  );
  return rows[0];
};

const getOrders = async () => {
  const { rows } = await pool.query(`SELECT * FROM orders ORDER BY id`);
  return rows;
};

const getOrderById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM orders WHERE id=$1`, [id]);
  return rows[0];
};

const updateOrder = async (id, fields) => {
  const keys = Object.keys(fields);
  const vals = Object.values(fields);
  const set = keys.map((k, i) => `${k}=$${i + 1}`).join(', ');
  const { rows } = await pool.query(
    `UPDATE orders SET ${set} WHERE id=$${keys.length + 1} RETURNING *`,
    [...vals, id]
  );
  return rows[0];
};

const deleteOrder = async (id) => {
  await pool.query(`DELETE FROM orders WHERE id=$1`, [id]);
  return true;
};

module.exports = { createOrder, getOrders, getOrderById, updateOrder, deleteOrder };
