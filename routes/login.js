const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const {validation, authentication} = require('../middlewares/middlewares');
const login = require('../controller/login/login');
const register = require('../controller/login/register');

router.post( '/',
             body('username').exists(),
             body('password').exists(),
             validation,
             authentication,
             login);

router.post( '/register',
             body('username').exists(),
             body('password').exists(),
             validation,
             register);

module.exports = router;
