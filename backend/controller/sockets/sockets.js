const {instrument} = require('@socket.io/admin-ui')

require('dotenv').config()

var io;

function socketsInit(server) {
    io = require('socket.io')(server, {
        cors: {
          origin: ["http://localhost:8080", "http://admin.socket.io"]
        }
      });

      // io.on('connection', socket => {
      //   console.log('user connected');

      //   socket.on('')
      //   // socket.on('canvi-sala', () => {
      //   //   socket.leave(salaOut)
      //   //   socket.join(salaIn)
      //   // });

      //   socket.on('custom-event', (data) => {
      //     console.log(data)
      //   })

      //   socket.on('disconnect', () => {
      //     console.log(`user disconnected`);
      //   });
      // });

      io.on('connection', (socket) => {
        console.log('user connected');
        
        socket.on('new-message', (message, room) => {
          if (room === '') {
            socket.broadcast.emit('receive-message', message)
          } else {
            socket.to(room).emit('receive-message', message)
          } 
        })

        socket.on('new-room', (oldRoom, newRoom, cb) => {
          socket.leave(oldRoom);
          socket.join(newRoom);
          cb(`Left ${oldRoom} Join ${newRoom}`);
        })

        // socket.on('custom-event', (data) => {
        //   console.log(data)
        // })
        
        socket.on('disconnect', () => {
          console.log(`user disconnected`);
        });
      });

      // TODO: remove this
      instrument(io, {auth: false})
}

function socketEmit(socket, data){
  io.sockets.emit(socket, data);
}


module.exports  = {socketsInit, socketEmit}
