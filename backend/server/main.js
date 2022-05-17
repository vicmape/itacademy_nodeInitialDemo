// use .env file variables
require('dotenv').config()

const express = require('express'); 

const cors = require('cors')
const app = express(); 
const server = require('http').Server(app); 
const {socketsInit} = require('../controller/sockets/sockets');

// Create Database if not exists
require('../models/models.js')();

// Express middleware
app.use(express.json())
app.use(cors())

// Express routes
app.use('/register', require('../routes/register'))
app.use('/login', require('../routes/login'))
app.use('/auth', require('../routes/auth'))
app.use('/rooms', require('../routes/rooms'))
app.use((req, res) => res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"}));

// Sockets initialization
socketsInit(server);

PORT = process.env.API_PORT || 8080
server.listen(PORT, console.log(`Server running at http://localhost:${PORT}...`));
