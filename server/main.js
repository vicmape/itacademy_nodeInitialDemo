// use .env file variables
require('dotenv').config()

const express = require('express'); 
const app = express(); 
const server = require('http').Server(app); 
const io = require('socket.io')(server);
const cors = require('cors')

// Create Database if not exists
require('../models/models.js')();

app.use(cors())

// Express middleware
app.use(express.json())
// Express routes
app.use('/register', require('../routes/register'))
app.use('/login', require('../routes/login'))
app.use((req, res) => res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"}));

// var messages = [];


// io.on('connection', (socket) => {
//     console.log('Un cliente se ha conectado');
//     socket.emit('messages', messages); 

//     socket.on('new-message', data => {
//       messages.push(data); 
//       io.sockets.emit('messages', messages); 
//     })
// });

server.listen(process.env.API_PORT || 8080, console.log('Server running at http://localhost:8080...'));