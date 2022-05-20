const express = require('express');
const router = express.Router();

const {authentication} = require('../middlwares/authentication');
const login = require('../controller/login');

router.post( '/',
             authentication,
             login);

module.exports = router;