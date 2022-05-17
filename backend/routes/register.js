const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const {validation} = require('../middlewares/middlewares');
const register = require('../controller/register');

router.post( '/',
             body('username').exists(),
             body('password').exists(),
             validation,
             register);

module.exports = router;
