// backend/src/routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const driverController = require('../controllers/driverController');

router.use(auth);
router.post('/', driverController.createDriver);
router.get('/', driverController.listDrivers);
router.get('/:id', driverController.getDriver);
router.put('/:id', driverController.updateDriver);
router.delete('/:id', driverController.deleteDriver);

module.exports = router;
