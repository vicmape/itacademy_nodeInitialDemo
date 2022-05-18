const express = require('express');
const router = express.Router();

const { body, check } = require('express-validator');
const {validation, authJWT} = require('../middlewares/middlewares');

const selectRoom = require('../controller/rooms/selectRoom')
const getRoomsList = require('../controller/rooms/getRoomsList');
const getRoomUsersList = require('../controller/rooms/getRoomUserList');
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

router.get( '/:id/users',
            check('id','Invalid ID').exists(),
            validation,
            authJWT,
            getRoomUsersList);

router.post('/', 
            authJWT, 
            body('roomName').exists(),
            validation,
            createRoom);

router.delete( '/:id',
                check('id','Invalid ID').exists(),
                validation,
                authJWT,
                deleteRoom);

module.exports = router;
