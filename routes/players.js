const express = require('express');
const router = express.Router();
const getPlayers = require('../controller/getPlayers');
const addPlayer = require('../controller/addPlayer');

router.post('/', addPlayer);
router.put('/', (req, res) => res.send('PUT /players'));
router.post('/:id/games', (req, res) => res.send('POST /players/:id/games'));
router.delete('/:id/games', (req, res) => res.send('DELETE /players/:id/games'));
router.get('/', getPlayers);
router.get('/:id/games', (req, res) => res.send('GET /players/:id/games'));
router.get('/ranking', (req, res) => res.send('GET /players/ranking'));
router.get('/ranking/loser', (req, res) => res.send('GET /players/ranking/loser'));
router.get('/ranking/winner', (req, res) => res.send('GET /players/ranking/winner'));

module.exports = router;
