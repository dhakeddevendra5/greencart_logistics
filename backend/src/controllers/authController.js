// backend/src/controllers/authController.js
const bcrypt = require('bcrypt');
const { createUser, findUserByUsername } = require('../models/userModel');
const { signToken } = require('../utils/jwt');

const register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username & password required' });
    const existing = await findUserByUsername(username);
    if (existing) return res.status(409).json({ error: 'username already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({ username, passwordHash });
    res.json({ message: 'user created', user: { id: user.id, username: user.username } });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'username & password required' });
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ error: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'invalid credentials' });
    const token = signToken({ id: user.id, username: user.username, role: user.role });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
