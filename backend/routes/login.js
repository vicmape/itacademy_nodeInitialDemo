const express = require('express');
const router = express.Router();

const {authentication} = require('../middlewares/authentication');
const login = require('../controller/login');

router.post( '/',
             authentication,
             login);

module.exports = router;