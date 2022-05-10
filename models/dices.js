const Sequelize = require('sequelize');
const db = require('../config/database');

const Players = db.define('players', {
    username: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
    }
})

const Rolls = db.define('rolls', {
    dice1: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dice2: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

Players.hasMany(Rolls); // one-to-many relationship

Players.sync()
.then()
.catch(err => console.log(err));

Rolls.sync()
.then()
.catch(err => console.log(err));

module.exports = {Players, Rolls};
