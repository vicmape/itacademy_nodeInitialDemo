const express = require('express');
const { Sequelize } = require('sequelize');

// Database
const db = new Sequelize('mysql://test:1234@localhost:3306/dices');

db.authenticate()
    .then(()=>console.log('Database connected...'))
    .catch (err => console.log('Error ' + err));


console.log("database name " + db.getDatabaseName());

db.drop().then(res=>console.log("everything deleted")).catch(err=>console.log("error deleting"));

db.dropAllSchemas().then(res=>console.log("everything deleted")).catch(err=>console.log("error deleting"));

db.query('show tables').then(function(rows) {
    console.log(JSON.stringify(rows));
});

// const Player = db.define('player', {
//     player_id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     username: {
//         type: Sequelize.STRING,
//         defaultValue: null,
//         allowNull: true
//     }
// })


// Player.findAll()
//         .then (player =>{
//             console.log(player);
//             res.send(200);
//         })
//         .catch(err => console.log(err));
