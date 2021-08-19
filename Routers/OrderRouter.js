const express = require('express');
const { getOrders, updateOrder } = require('../Controllers/OrderControllers');
const { admin } = require('../Middleware/Admin');
const { auth } = require('../Middleware/Auth');

const OrderRouter = express.Router();

OrderRouter.get('/get', auth, admin, getOrders);
OrderRouter.post('/update', auth, admin, updateOrder);

module.exports = OrderRouter;
