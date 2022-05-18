const express = require('express');
const router = express.Router();

const {authJWT} = require('../middlewares/middlewares');
const auth = require('../controller/auth/auth');

router.post('/',
            authJWT,
            auth);

module.exports = router;
