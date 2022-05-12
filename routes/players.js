const express = require('express');
const router = express.Router();

const getPlayers = require('../controller/getPlayers');
const addPlayer = require('../controller/addPlayer');
const updatePlayer = require('../controller/updatePlayer');
const rollDices = require('../controller/rollDices');
const deleteRolls = require('../controller/deleteRolls');
const getRolls = require('../controller/getRolls');
const getRanking = require('../controller/getRanking');
const getLoser = require('../controller/getLoser');
const getWinner = require('../controller/getWinner');

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
