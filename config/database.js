const { Sequelize } = require('sequelize');

module.exports = new Sequelize('mysql://test:1234@localhost:3306/dices')