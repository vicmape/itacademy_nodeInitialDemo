// use .env file variables
require('dotenv').config()

const express = require('express'); 
const app = express(); 
const server = require('http').Server(app); 
const io = require('socket.io')(server, {
  cors: {
    origin: "*",

  }
});

// Create Database if not exists
require('../models/models.js')();

// Express middleware
app.use(express.json())

// Express routes
app.use('/register', require('../routes/register'))
app.use('/login', require('../routes/login'))
app.use((req, res) => res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"}));



io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('new-message', data => {
      console.log(data)
      io.sockets.emit('messages', data); 
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});


PORT = process.env.API_PORT || 8080
server.listen(PORT, console.log(`Server running at http://localhost:${PORT}...`));