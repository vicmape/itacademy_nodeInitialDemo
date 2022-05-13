const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {validation} = require('../middlewares/middlewares');

router.get( '/:id',
            check('id','Invalid ID').isInt(),
            validation,
            require('../controller/games/getGames'));

router.post( '/:id',
             check('id','Invalid ID').isInt(),
             validation,
             require('../controller/games/runGame'));

router.delete( '/:id',
               check('id','Invalid ID').isInt(),
               validation,
               require('../controller/games/deleteGames'));

module.exports = router;
