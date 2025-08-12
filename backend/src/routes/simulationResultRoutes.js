// backend/src/routes/simulationResultRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { listHistory } = require('../controllers/simulationResultController');

router.get('/', auth, listHistory);

module.exports = router;
