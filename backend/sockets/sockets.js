require('dotenv').config();

const jwt = require('jsonwebtoken');

const {getRooms, createRoom} = require('../../backend/services/rooms');
const {getUsers, disconnectUser, joinRoom} = require('../../backend/services/users');
const {getMessages, newMessage} = require('../../backend/services/messages');

module.exports = async (io) => {

    io.use(function(socket, next){
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, process.env.ACCESS_TOKEN_SECRET, function(err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
        }
        else {
        next(new Error('Authentication error'));
        }
    })

    io.on('connection', socket => {

        const user = {userId: socket.decoded.userId, userName: socket.decoded.userName}

        // console.log(`user ${user.userName} connected`);

        socket.on('new-message', async (message) => {
            // console.log("new-message")
            let newMessageRes = await newMessage(message);
            // console.log('new-message', newMessageRes);

            if (newMessageRes.status === 'success') {
                socket.broadcast.to(message.room.roomId).emit('new-message', newMessageRes.message);
            } else {
                io.to(socket.id).emit('error', newMessageRes.message);
            }
        })

        socket.on('new-room', async (roomName) => {

            let newRoomRes = await createRoom(roomName);
            // console.log(`new-room`, newRoomRes)

            if (newRoomRes.status === 'success') {

                // get the old new room #users
                let getUsersRes = await getUsers(newRoomRes.room);
                // inform about new room #users
                io.emit('new-room', newRoomRes.room, getUsersRes.users);
                io.to(socket.id).emit('success', `${roomName} created`);
            } else {
                io.to(socket.id).emit('error', newRoomRes.message);
            }
        })

        socket.on('get-rooms', async () => {

            let getRoomsRes = await getRooms();
            // console.log(`get-rooms`, getRoomsRes)

            if (getRoomsRes.status === 'success') {
                getRoomsRes.rooms.forEach (async (room) => {
                    let getUsersRes = await getUsers(room);
                    io.to(socket.id).emit('new-room', room, getUsersRes.users)
                });
            } else {
                io.to(socket.id).emit('error', getRoomsRes.message);
            }
        })

        socket.on('join-room', async (room) => {

            let joinRoomRes = await joinRoom(user, room);
            // console.log('join-room', joinRoomRes);

            if (joinRoomRes.status === 'success') {

                if (joinRoomRes.oldRoom.roomId) {

                    // leave the old room
                    socket.leave(joinRoomRes.oldRoom.roomId);
                    // console.log(`user ${user.userName} left room ${joinRoomRes.oldRoom.roomName}`);

                    // inform old room we left
                    socket.broadcast.to(joinRoomRes.oldRoom.roomId).emit('new-join-message', `${joinRoomRes.user.userName} left the room`);

                    // get the old room #users
                    let getUsersRes = await getUsers(joinRoomRes.oldRoom);

                    // inform everyone about the old room #users
                    io.emit('update-room-users', joinRoomRes.oldRoom, getUsersRes.users);
                }

                // join the new room
                socket.join(room.roomId);
                // console.log(`user ${user.userName} joined room ${room.roomName}`);

                // inform new room we came
                socket.broadcast.to(room.roomId).emit('new-join-message', `${joinRoomRes.user.userName} joined the room`);

                // get the new room #users
                let getUsersRes = await getUsers(room);

                // inform everyone about the new room #users
                io.emit('update-room-users', room, getUsersRes.users);

                // Get the messages of the new room
                let getMessagesRes = await getMessages(room);
                // console.log('get-messages', getMessagesRes)

                if ((getMessagesRes.status === 'success') && (getMessagesRes.messages !== null)) {
                    getMessagesRes.messages.forEach (message => io.to(socket.id).emit('new-message', message))
                } else {
                    io.to(socket.id).emit('error', getMessagesRes.message)
                }
            } else {
                io.to(socket.id).emit('error', joinRoomRes.message);
            }
        })
        
        socket.on('disconnect', async () => {
            // console.log(`user ${user.userName} disconnected`);

            let disconnectUserRes = await disconnectUser(user);
            // console.log('disconnectUserRes', disconnectUserRes)

            if (disconnectUserRes.status === 'success') {
                
                // leave the old room
                socket.leave(disconnectUserRes.room.roomId);
                // console.log(`user ${disconnectUserRes.user.userName} left room ${disconnectUserRes.room.roomName}`);

                // inform old room we left
                socket.broadcast.to(disconnectUserRes.room.roomId).emit('new-join-message', `${disconnectUserRes.user.userName} left the room`);

                // get the new room #users
                let getUsersRes = await getUsers(disconnectUserRes.room);

                // inform everyone about the new room #users
                io.emit('update-room-users', disconnectUserRes.room, getUsersRes.users);
            } else {
                io.to(socket.id).emit('error', disconnectUserRes.message);
            }
        });
    })
}