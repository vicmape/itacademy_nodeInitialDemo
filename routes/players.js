const express = require('express');
const router = express.Router();

router.get('/', require('../controller/player/getPlayers'));
router.post('/', require('../controller/player/addPlayer'));
router.put('/:id', require('../controller/player/updatePlayer'));
router.delete('/:id', require('../controller/player/deletePlayer'));

module.exports = router;
