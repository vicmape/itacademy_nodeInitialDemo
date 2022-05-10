const Sequelize = require('sequelize');
const mysql = require('mysql2/promise');

require('dotenv').config();

(async ()=>{
    // Create database if not exist
    const connection = await mysql.createConnection({ 
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS });
  
      const con = await connection.connect();
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
      console.log(`Database ${process.env.DB_NAME} (re)created`);
      await connection.end();
})();
 
// Export connection to database
module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT
  }); 
