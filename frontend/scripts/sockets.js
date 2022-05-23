
const socket = io('http://localhost:8080', {
    reconnectionDelayMax: 10000,
    query: {
        'token': sessionStorage.accessToken
    }
});

let socketConnected = false;

socket.on('connect', () => {

  // console.log('Socket connected');

    // TODO: we make sure we only connect once. 
    // This prevents the client to connect again when server disconnects.
    // Find the right way to do this.
    if (socketConnected) return;
    socketConnected = true;

  // console.log(`userName: ${sessionStorage.userName}`)
  // console.log(`userId: ${sessionStorage.userId}`)
  // console.log(`accessToken: ${sessionStorage.accessToken}`)

    socket.on('new-message', message => {
        // console.log("new-message", message);
        displayMessage(message);
    })

    socket.on('new-join-message', message => {
        // console.log("new-join-message", message);
        displayJoinMessage(message);
    })

    socket.on('new-room', (room, users) => {
        // console.log('new-room', room);
        displayRoom(room);
        displayRoomUsers(room, users);
    })

    socket.on('update-room-users', (room, users) => {
        // console.log('update-room-users', room, users);

        // Display users in our console
        if (sessionStorage.roomId === room.roomId) {
            displayUsers(users)
        }

        displayRoomUsers(room, users);
    })

    socket.on('error', message => {
        alert(message);
    })

    socket.on('disconnect', () => {
      // console.log('Socket disconnected')
    });

    // Delete room list
    document.getElementById("roomList").innerHTML = '';

    // Ask for the room list again
    socket.emit('get-rooms');
})