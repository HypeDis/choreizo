const express = require('express');
const apiRoutes = express.Router();
//import api routes here
const choresAPIRoutes = require('./ChoresRoutes');
const tradeChoreRoutes = require('./tradeChoreRoutes');
const swapChoreRoutes = require('./swapChoreRoutes');
const transferChoreRoutes = require('./transferChoreRoutes');

const choresAPIRoutes = require('./chores');

// set api routes here
apiRoutes.use('/trade_chore', tradeChoreRoutes);
apiRoutes.use('/swap_chore', swapChoreRoutes);
apiRoutes.use('/transfer_chore', transferChoreRoutes);

apiRoutes.use('/chores', choresAPIRoutes);

module.exports = apiRoutes;
