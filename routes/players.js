const express = require('express');
const router = express.Router();

const getPlayers = require('../controller/getPlayers');
const addPlayer = require('../controller/addPlayer');
const updatePlayer = require('../controller/updatePlayer');
const rollDices = require('../controller/rollDices');

router.post('/', addPlayer);
router.put('/', updatePlayer);
router.post('/:id/games', rollDices);
router.delete('/:id/games', (req, res) => res.send('DELETE /players/:id/games'));
router.get('/', getPlayers);
router.get('/:id/games', (req, res) => res.send('GET /players/:id/games'));
router.get('/ranking', (req, res) => res.send('GET /players/ranking'));
router.get('/ranking/loser', (req, res) => res.send('GET /players/ranking/loser'));
router.get('/ranking/winner', (req, res) => res.send('GET /players/ranking/winner'));

module.exports = router;
