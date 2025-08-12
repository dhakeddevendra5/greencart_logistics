// backend/src/utils/seedData.js
// Basic seeding logic — used by a small script or when server starts in dev
const pool = require('../config/db');
const bcrypt = require('bcrypt');

const seed = async () => {
  try {
    // create tables if not exists (simple)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT DEFAULT 'manager',
        created_at TIMESTAMP DEFAULT NOW()
      );
      CREATE TABLE IF NOT EXISTS drivers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        current_shift_hours INT DEFAULT 0,
        past_7_days_hours JSONB DEFAULT '[]'::jsonb
      );
      CREATE TABLE IF NOT EXISTS routes (
        id SERIAL PRIMARY KEY,
        route_id TEXT NOT NULL,
        distance_km INT NOT NULL,
        traffic_level TEXT NOT NULL,
        base_time_minutes INT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        order_id TEXT NOT NULL,
        value_rs INT NOT NULL,
        assigned_route_id TEXT,
        delivery_timestamp TIMESTAMP NULL
      );
      CREATE TABLE IF NOT EXISTS simulation_results (
        id SERIAL PRIMARY KEY,
        input JSONB,
        results_json JSONB,
        summary TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // seed default manager user
    const pw = 'password123';
    const hash = await bcrypt.hash(pw, 10);
    const res = await pool.query(`SELECT * FROM users WHERE username='manager'`);
    if (res.rows.length === 0) {
      await pool.query(
        `INSERT INTO users (username, password_hash, role) VALUES ($1,$2,'manager')`,
        ['manager', hash]
      );
      console.log('Seeded manager / password123');
    }

    // seed drivers
    const drivers = [
      { name: 'Ravi', current_shift_hours: 6, past_7_days_hours: [7,6,5,8,6,6,7] },
      { name: 'Asha', current_shift_hours: 9, past_7_days_hours: [8,9,7,8,9,6,5] },
      { name: 'Sunil', current_shift_hours: 4, past_7_days_hours: [4,4,5,6,4,5,4] },
    ];
    for (const d of drivers) {
      const exists = await pool.query(`SELECT * FROM drivers WHERE name=$1`, [d.name]);
      if (exists.rows.length === 0) {
        await pool.query(
          `INSERT INTO drivers (name, current_shift_hours, past_7_days_hours) VALUES ($1,$2,$3)`,
          [d.name, d.current_shift_hours, JSON.stringify(d.past_7_days_hours)]
        );
      }
    }

    // seed routes
    const routes = [
      { route_id: 'R-101', distance_km: 10, traffic_level: 'Normal', base_time_minutes: 30 },
      { route_id: 'R-102', distance_km: 20, traffic_level: 'High', base_time_minutes: 50 },
      { route_id: 'R-103', distance_km: 5, traffic_level: 'Medium', base_time_minutes: 20 },
    ];
    for (const r of routes) {
      const exists = await pool.query(`SELECT * FROM routes WHERE route_id=$1`, [r.route_id]);
      if (exists.rows.length === 0) {
        await pool.query(
          `INSERT INTO routes (route_id, distance_km, traffic_level, base_time_minutes) VALUES ($1,$2,$3,$4)`,
          [r.route_id, r.distance_km, r.traffic_level, r.base_time_minutes]
        );
      }
    }

    // seed orders
    const orders = [
      { order_id: 'O-1001', value_rs: 1200, assigned_route_id: 'R-101' },
      { order_id: 'O-1002', value_rs: 800, assigned_route_id: 'R-102' },
      { order_id: 'O-1003', value_rs: 1500, assigned_route_id: 'R-103' },
      { order_id: 'O-1004', value_rs: 300, assigned_route_id: 'R-102' },
    ];
    for (const o of orders) {
      const exists = await pool.query(`SELECT * FROM orders WHERE order_id=$1`, [o.order_id]);
      if (exists.rows.length === 0) {
        await pool.query(
          `INSERT INTO orders (order_id, value_rs, assigned_route_id) VALUES ($1,$2,$3)`,
          [o.order_id, o.value_rs, o.assigned_route_id]
        );
      }
    }

    console.log('Seeding complete');
  } catch (err) {
    console.error('Seed error', err);
  }
};

module.exports = { seed };
