function createRoom(form) {
    const newRoomName = form.newRoom.value

    if (newRoomName) {
        socket.emit('new-room', newRoomName)

        form.newRoom.value = '';
    }

    return false;
}
function joinRoom(room) {

    // If we are in the same room do nothing
    if (sessionStorage.roomId === room.roomId) return;

    // Inform the server we are joining new room
    socket.emit('join-room', sessionStorage.userId, room);

    // Update session storage variables
    sessionStorage.roomName = room.roomName;
    sessionStorage.roomId = room.roomId;

    // Change room name
    document.getElementById("roomName").innerHTML = `ROOM: ${room.roomName}`;

    // Delete messages
    document.getElementById("messageList").innerHTML = "";

    // Delete users
    document.getElementById("userList").innerHTML = "";

    // Display self on our user list
    let user = {userName: sessionStorage.userName, userId: sessionStorage.userId};
    displayUser(user)

    // Get new users
    socket.emit('get-users', room);

    // Get new messages
    socket.emit('get-messages', room);
}


function displayRoom(room) {

    // We use this spot to set the sessionStorage.roomId as we do not not its ID at the beggining.
    if (room.roomName === 'Lobby' && sessionStorage.roomName === 'Lobby') {
        sessionStorage.roomId = room.roomId;
    }

    const li = document.createElement('button');
    li.textContent = room.roomName;
    li.setAttribute("id", room.roomId);
    li.classList.add('room__li');
    li.onclick = () => {

        if (sessionStorage.roomId) {
            document.getElementById(sessionStorage.roomId).classList.remove('room__li--active')
        }

        li.classList.add('room__li--active')
        joinRoom(room);
    }

    const rooms = document.getElementById("roomList");
    rooms.appendChild(li);

    sortUlList("roomList");
}