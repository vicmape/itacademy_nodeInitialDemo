const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');
const {validation} = require('../middlewares/middlewares');

router.get('/', require('../controller/player/getPlayers'));

router.post( '/',
             require('../controller/player/addPlayer'));

router.put( '/:id',
            check('id','Invalid ID').isInt(),
            body('username').exists(),
            validation,
            require('../controller/player/updatePlayer'));

router.delete( '/:id',
               check('id','Invalid ID').isInt(),
               validation,
               require('../controller/player/deletePlayer'));

module.exports = router;
