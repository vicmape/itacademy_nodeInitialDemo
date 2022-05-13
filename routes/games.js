const express = require('express');
const router = express.Router();

router.get('/:id', require('../controller/games/getRolls'));
router.post('/:id', require('../controller/games/rollDices'));
router.delete('/:id', require('../controller/games/deleteRolls'));

module.exports = router;
