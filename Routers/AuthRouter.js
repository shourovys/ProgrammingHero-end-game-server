const express = require('express');
const { sineUp, login, makeAdmin } = require('../Controllers/AuthController');
const { admin } = require('../Middleware/Admin');
const { auth } = require('../Middleware/Auth');

const authRouter = express.Router();

authRouter.post('/sineUp', sineUp);

authRouter.post('/login', login);

authRouter.post('/make-admin', auth, admin, makeAdmin);
module.exports = authRouter;
