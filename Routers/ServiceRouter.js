const express = require('express');
const { addService, updateService, getServices } = require('../Controllers/ServiceControllers');
const { admin } = require('../Middleware/Admin');
const { auth } = require('../Middleware/Auth');

const serviceRouter = express.Router();

serviceRouter.post('/add', auth, admin, addService);

serviceRouter.post('/update', auth, admin, updateService);

serviceRouter.get('/services', getServices);

module.exports = serviceRouter;
