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
const {getUsers, userSocket, disconnectUser, joinRoom} = require('../backend/services/users')
const {getMessages} = require('../backend/services/messages')

//Middlewares
app.use(express.json())
app.use(cors())

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'))
app.use('/auth', require('./routes/auth'))
app.use((req, res) => res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"}));


io.on('connection', socket => {
    let result;

    socket.on('hello', async (userId) => {
        await userSocket(userId, socket.id);
    })

    socket.on('new-message', (roomId, message) => {
        socket.broadcast.to(roomId).emit('new-message', message);
    })

    socket.on('new-room', async (roomName) => {

        result = await createRoom(roomName);
        console.log(`createRoom`, result)
        if (result.status === 'success') {
            io.emit('new-room', result.room);
        } else {
            io.to(socket.id).emit('error', result.message)
        }
    })

    socket.on('get-rooms', async () => {
        result = await getRooms();
         console.log(`getRooms`, result)
        if (result.status === 'success') {
            result.rooms.forEach (room => io.to(socket.id).emit('new-room', room))
        } else {
            io.to(socket.id).emit('error', result.message)
        }
    })

    socket.on('get-users', async (room) => {
        result = await getUsers(room);
        console.log(`getUsers`, result)
        if (result.status === 'success') {
            result.users.forEach (user => io.to(socket.id).emit('new-user', user))
        } else {
            io.to(socket.id).emit('error', result.message)
        }
    })

    socket.on('get-messages', async (room) => {
        result = await getMessages(room);
        console.log(`getMessages`, result)
        if (result.status === 'success') {
            result.messages.forEach (message => io.to(socket.id).emit('new-message', message))
        } else {
            io.to(socket.id).emit('error', result.message)
        }
    })


    socket.on('join-room', async (userId, room) => {
        result = await joinRoom(userId, room);
        console.log(`joinRoom`, result)
        if (result.status === 'success') {
            // Success
            io.to(result.roomId).emit('delete-user', result.user);
            socket.leave(result.roomId);
            socket.join(room.roomId);
        } else {
            io.to(socket.id).emit('error', result.message)
        }
    })

    socket.on('disconnect', async () => {
        console.log('user disconnected');
        result = await disconnectUser(socket.id);
        console.log(`disconnectUser`, result)
        if (result.status === 'success') {
            // Success
            io.to(result.roomId).emit('delete-user', result.user)
        }
      });

})


PORT = process.env.API_PORT || 8080
server.listen(PORT, console.log(`Server running at http://localhost:${PORT}...`));