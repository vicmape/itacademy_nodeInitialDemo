const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Player = require('../models/Dices');

router.get('/', (req, res) => 
    Player.findAll()
        .then (player =>{
            console.log(player);
            res.send(200);
        })
        .catch(err => console.log(err)));

module.exports = router;
