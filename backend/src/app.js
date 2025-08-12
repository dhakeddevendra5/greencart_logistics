// backend/src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/authRoutes');
const driverRoutes = require('./routes/driverRoutes');
const routeRoutes = require('./routes/routeRoutes');
const orderRoutes = require('./routes/orderRoutes');
const simulationRoutes = require('./routes/simulationRoutes');
const simulationResultRoutes = require('./routes/simulationResultRoutes');

const { seed } = require('./utils/seedData');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/routes', routeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/simulations', simulationRoutes);
app.use('/api/simulation-results', simulationResultRoutes);

app.get('/', (req, res) => res.json({ message: 'GreenCart Logistics API up' }));

app.use(errorHandler);

// seed in development
if (process.env.SEED_DB === 'true') {
  seed();
}

module.exports = app;
