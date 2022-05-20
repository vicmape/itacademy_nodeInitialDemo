const express = require('express');
const router = express.Router();

const register = require('../controller/register');

router.post( '/',
             register);

module.exports = router;
