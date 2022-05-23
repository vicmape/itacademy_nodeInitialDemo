require('dotenv').config();
const {instrument} = require('@socket.io/admin-ui');
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
const {getRooms, createRoom, getLobbyId} = require('../backend/services/rooms')
const {getUsers, userSocket, disconnectUser, joinRoom} = require('../backend/services/users')
const {getMessages, newMessage} = require('../backend/services/messages')

//Middlewares
app.use(express.json())
app.use(cors())

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'))
app.use('/auth', require('./routes/auth'))
app.use((req, res) => res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"}));


io.on('connection', socket => {

    socket.on('hello', async (userId) => {
        await userSocket(userId, socket.id);
    })

    socket.on('new-message', async (message) => {

        let newMessageRes = await newMessage(message);
        console.log('new-message', newMessageRes)
        if (newMessageRes.status === 'success') {
            socket.broadcast.to(message.room.roomId).emit('new-message', newMessageRes.message);
        } else {
            io.to(socket.id).emit('error', newMessageRes.message)
        }
    })

    socket.on('new-room', async (roomName) => {

        let newRoomRes = await createRoom(roomName);
        //console.log(`new-room`, newRoomRes)
        if (newRoomRes.status === 'success') {
            io.emit('new-room', newRoomRes.room);
        } else {
            io.to(socket.id).emit('error', newRoomRes.message)
        }
    })

    socket.on('get-rooms', async () => {

        let getRoomsRes = await getRooms();
         //console.log(`get-rooms`, getRoomsRes)
        if (getRoomsRes.status === 'success') {
            getRoomsRes.rooms.forEach (room => io.to(socket.id).emit('new-room', room))
        } else {
            io.to(socket.id).emit('error', getRoomsRes.message)
        }
    })

    socket.on('get-users', async (room) => {
        let getUsersRes = await getUsers(room);
        //console.log(`get-users`, getUsersRes)
        if (getUsersRes.status === 'success') {
            getUsersRes.users.forEach (user => io.to(socket.id).emit('new-user', user))
        } else {
            io.to(socket.id).emit('error', getUsersRes.message)
        }
    })

    socket.on('get-messages', async (room) => {
        let getMessagesRes = await getMessages(room);
        //console.log('get-messages', getMessagesRes)
        if ((getMessagesRes.status === 'success') && (getMessagesRes.messages !== null)) {
            getMessagesRes.messages.forEach (message => io.to(socket.id).emit('new-message', message))
        } else {
            io.to(socket.id).emit('error', getMessagesRes.message)
        }
    })

    socket.on('join-room', async (userId, room) => {

        let joinRoomRes = await joinRoom(userId, room);
        //console.log(`join-room`, joinRoomRes)
        if (joinRoomRes.status === 'success') {

            // old room stuff
            if (room.roomId){
                socket.leave(joinRoomRes.roomId);
                socket.broadcast.to(joinRoomRes.roomId).emit('delete-user', joinRoomRes.user);
                socket.broadcast.to(joinRoomRes.roomId).emit('new-join-message', `${joinRoomRes.user.userName} left the room`);
            }

            socket.join(room.roomId);
            socket.broadcast.to(room.roomId).emit('new-user', joinRoomRes.user);
            socket.broadcast.to(room.roomId).emit('new-join-message', `${joinRoomRes.user.userName} joined the room`);
        } else {
            io.to(socket.id).emit('error', joinRoomRes.message)
        }
    })

    socket.on('disconnect', async () => {

        let disconnectRes = await disconnectUser(socket.id);
        //console.log('disconnectRes', disconnectRes)
        if (disconnectRes.status === 'success') {
            // Success
            io.to(disconnectRes.roomId).emit('delete-user', disconnectRes.user)
        }
      });
})

instrument(io, {auth: false});

PORT = process.env.API_PORT || 8080
server.listen(PORT, console.log(`Server running at http://localhost:${PORT}...`));