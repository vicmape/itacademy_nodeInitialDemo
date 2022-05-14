
const mysql = require('mysql2/promise');

// Create database if not exist
module.exports = (async ()=>{
    const connection = await mysql.createConnection({ 
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS });
  
      await connection.connect();
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
      console.log(`Database ${process.env.DB_NAME} (re)created`);
      await connection.end();
});