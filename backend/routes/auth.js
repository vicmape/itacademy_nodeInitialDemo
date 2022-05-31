const express = require('express');
const router = express.Router();

const {authJWT} = require('../middlewares/authentication');
const auth = require('../controller/auth');

router.post('/',
            authJWT,
            auth);

module.exports = router;
