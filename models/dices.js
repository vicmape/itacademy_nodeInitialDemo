const Sequelize = require('sequelize');
const db = require('../config/database');

const Players = db.define('players', {
    username: {
        type: Sequelize.STRING,
        defaultValue: null,
        allowNull: true
    }
})

// const Rolls = db.define('rolls', {
//     dice1: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     dice2: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     player_id: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: 'players', 
//             key: 'id', 
//          }
//     }
// })

// Players.hasMany(Rolls); // one-to-many relationship

// (async () => {
//     await Players.sync();
//     await Rolls.sync();
// })().catch(err => {
//     console.error(err);
// });

module.exports = Players;
