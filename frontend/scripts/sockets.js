const socket = io.connect('http://localhost:8080');

socket.on('connect', () => {
    // console.log('connect');
})

socket.on('new-message', message => {
    //console.log("new-message", message);
    displayMessage(message);
})

socket.on('new-join-message', message => {
    //console.log("new-join-message", message);
    displayJoinMessage(message);
})

socket.on('new-room', room => {
    // console.log('new-room', room);
    displayRoom(room);
})

socket.on('update-room-users', (room, users) => {
    console.log('update-room-users', room, users);
    // TODO
})

socket.on('error', message => {
    alert(message);
})

socket.emit('get-rooms');
// TODO JWT over sockets
socket.emit('hello', sessionStorage.userId)