const express = require('express');
const {
  getUserOrders,
  updateOrder,
  createOrder,
  getAdminOrders,
} = require('../Controllers/OrderControllers');
const { admin } = require('../Middleware/Admin');
const { auth } = require('../Middleware/Auth');

const OrderRouter = express.Router();

OrderRouter.get('/user/get', auth, getUserOrders);
OrderRouter.get('/admin/get', auth, admin, getAdminOrders);
OrderRouter.post('/update', auth, admin, updateOrder);
OrderRouter.post('/create', auth, createOrder);

module.exports = OrderRouter;
