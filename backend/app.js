require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});


// Create Database if not exists
require('./models/models.js')();
const {getRooms, createRoom} = require('../backend/services/rooms')

//Middlewares
app.use(express.json())
app.use(cors())

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'))
app.use('/auth', require('./routes/auth'))
app.use((req, res) => res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"}));


io.on('connection', socket => {
    let result;

    socket.on('new-message', message => {
        console.log(message);
        socket.broadcast.emit('new-message', message);
    })

    socket.on('new-room', async (roomName) => {

        result = await createRoom(roomName);
        if (result.status === 'success') {
            io.emit('new-room', result.room);
        } else {
            io.to(socket.id).emit('error', result.message)
        }
    })

    socket.on('cmd', async (cmd) => {

        if (cmd === 'get-rooms') {
            result = await getRooms();
            if (result.status === 'success') {
                result.rooms.forEach (room => io.to(socket.id).emit('new-room', room))
            } else {
                io.to(socket.id).emit('error', result.message)
            }
        }
    })

})


PORT = process.env.API_PORT || 8080
server.listen(PORT, console.log(`Server running at http://localhost:${PORT}...`));