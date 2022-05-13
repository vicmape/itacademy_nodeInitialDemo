const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const {validation, authentication} = require('../middlewares/middlewares');
const login = require('../controller/login/login');

router.post( '/',
             body('username').exists(),
             body('password').exists(),
             validation,
             authentication,
             login);

module.exports = router;
