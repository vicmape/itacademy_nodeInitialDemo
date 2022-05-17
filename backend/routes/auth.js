const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const {validation, authJWT} = require('../middlewares/middlewares');
const auth = require('../controller/auth');

router.post( '/',
             authJWT,
             auth);

module.exports = router;
