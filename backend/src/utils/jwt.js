// backend/src/utils/jwt.js
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const signToken = (payload, expiresIn = '8h') => jwt.sign(payload, jwtSecret, { expiresIn });
const verifyToken = (token) => jwt.verify(token, jwtSecret);

module.exports = { signToken, verifyToken };
