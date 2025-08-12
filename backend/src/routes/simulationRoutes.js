// backend/src/routes/simulationRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { runSimulation } = require('../controllers/simulationController');

router.post('/run', auth, runSimulation);

module.exports = router;
