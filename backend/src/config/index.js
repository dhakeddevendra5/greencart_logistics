// backend/src/config/index.js
require('dotenv').config();

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'default-secret-key',
  port: process.env.PORT || 4000,
};
