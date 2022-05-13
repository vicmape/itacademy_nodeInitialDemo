const express = require('express');
const router = express.Router();

const getPlayers = require('../controller/player/getPlayers');
const addPlayer = require('../controller/player/addPlayer');
const updatePlayer = require('../controller/player/updatePlayer');
const rollDices = require('../controller/player/rollDices');
const deleteRolls = require('../controller/player/deleteRolls');
const getRolls = require('../controller/player/getRolls');

router.post('/', addPlayer);
router.put('/', updatePlayer);
router.post('/:id/games', rollDices);
router.delete('/:id/games', deleteRolls);
router.get('/', getPlayers);
router.get('/:id/games', getRolls);
router.get('/ranking', getRanking);
router.get('/ranking/loser', getLoser);
router.get('/ranking/winner', getWinner);

module.exports = router;
