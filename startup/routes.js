const express = require('express');

const players = require('../routes/players');
const invalid = require('../routes/invalid');

module.exports = app => {
    app.use(express.json());
    app.use('/players', players);
    app.use(invalid);
}