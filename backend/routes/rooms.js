const express = require('express');
const router = express.Router();

const { body } = require('express-validator');
const {validation} = require('../middlewares/middlewares');

const {authJWT} = require('../middlewares/middlewares');
const getRooms = require('../controller/rooms/getRooms');
const createRoom = require('../controller/rooms/createRoom');
const deleteRoom = require('../controller/rooms/deleteRoom');

router.get( '/', authJWT, getRooms);
router.post('/', 
            authJWT, 
            body('name').exists(),
            validation,
            createRoom);
router.delete( '/', authJWT, deleteRoom);

module.exports = router;
