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

function newRoom(name) {
    io.sockets.emit('rooms', name);
}

module.exports  = {socketsInit, newRoom}
