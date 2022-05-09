const { Sequelize } = require('sequelize');
const db = require('../config/database');

const Player = db.define('player', {
    player_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
    }
})

/*
,
    createdAt: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
*/

/*
const Rolls = db.define('rolls', {
    roll_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    dice1: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dice2: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    win: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
    player_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'players', 
            key: 'player_id', 
         }
    }
})

Players.hasMany(Rolls); // one-to-many relationship
*/

module.exports = Player;
