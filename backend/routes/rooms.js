const express = require('express');
const router = express.Router();

const { body, check } = require('express-validator');
const {validation, authJWT} = require('../middlewares/middlewares');

const selectRoom = require('../controller/rooms/selectRoom')
const getRoomsList = require('../controller/rooms/getRoomsList');
const createRoom = require('../controller/rooms/createRoom');
const deleteRoom = require('../controller/rooms/deleteRoom');

router.get( '/',
            authJWT,
            getRoomsList);

router.get( '/:id',
            check('id','Invalid ID').exists(),
            validation,
            authJWT,
            selectRoom);

router.post('/', 
            authJWT, 
            body('name').exists(),
            validation,
            createRoom);

router.delete( '/',
                authJWT,
                deleteRoom);

module.exports = router;
