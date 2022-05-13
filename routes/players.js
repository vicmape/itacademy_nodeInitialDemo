const express = require('express');
const router = express.Router();

const rollDices = require('../controller/player/rollDices');
const deleteRolls = require('../controller/player/deleteRolls');
const getRolls = require('../controller/player/getRolls');
const getRanking = require('../controller/ranking/getRanking');
const getLoser = require('../controller/ranking/getLoser');
const getWinner = require('../controller/ranking/getWinner');

router.get('/', require('../controller/player/getPlayers'));
router.post('/', require('../controller/player/addPlayer'));
router.put('/:id', require('../controller/player/updatePlayer'));
router.delete('/:id', require('../controller/player/deletePlayer'));


router.post('/:id/games', rollDices);
router.delete('/:id/games', deleteRolls);
router.get('/:id/games', getRolls);
router.get('/ranking', getRanking);
router.get('/ranking/loser', getLoser);
router.get('/ranking/winner', getWinner);

module.exports = router;
