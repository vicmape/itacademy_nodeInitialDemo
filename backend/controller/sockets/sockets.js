require('dotenv').config()

var io;

function socketsInit(server) {
    io = require('socket.io')(server, {
        cors: {
          origin: "*"
        }
      });

      io.on('connection', (socket) => {
        console.log('user connected');
        
        socket.on('new-message', data => {
          io.sockets.emit('messages', data); 
        })
        
        socket.on('disconnect', () => {
          console.log(`user disconnected`);
        });
    });
}

function socketsCreateRoom(newRoom) {
  io.sockets.emit('rooms', newRoom);
}

function socketsDeleteRoom(deleteRoom) {
  io.sockets.emit('rooms', deleteRoom);
}

module.exports  = {socketsInit, socketsCreateRoom, socketsDeleteRoom}
