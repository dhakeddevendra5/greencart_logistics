// backend/src/routes/routeRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const routeController = require('../controllers/routeController');

router.use(auth);
router.post('/', routeController.createRoute);
router.get('/', routeController.listRoutes);
router.get('/:id', routeController.getRoute);
router.put('/:id', routeController.updateRoute);
router.delete('/:id', routeController.deleteRoute);

module.exports = router;
