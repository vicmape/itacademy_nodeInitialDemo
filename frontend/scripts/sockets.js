const socket = io.connect('http://localhost:8080');

socket.on('connect', () => {
})

socket.on('new-message', message => {
    displayMessage(message);
})


socket.on('new-room', room => {
    displayRoom(room);
})

socket.on('new-user', user => {
    displayUser(user);
})

socket.on('delete-user', user => {
    deleteUser(user);
})

socket.on('error', message => {
    alert(message)
})

socket.emit('get-rooms');
socket.emit('hello', sessionStorage.userId)