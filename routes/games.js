const express = require('express');
const router = express.Router();

router.get('/:id', require('../controller/games/getGames'));
router.post('/:id', require('../controller/games/runGame'));
router.delete('/:id', require('../controller/games/deleteGames'));

module.exports = router;
