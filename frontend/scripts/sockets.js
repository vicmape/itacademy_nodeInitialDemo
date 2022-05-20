const socket = io.connect('http://localhost:8080');

socket.on('connect', () => {

})

socket.on('new-message', message => {
    displayMessage(message);
})

socket.on('new-room', room => {
    displayRoom(room);
})

socket.on('error', message => {
    alert(message)
})

socket.emit('cmd', "get-rooms");