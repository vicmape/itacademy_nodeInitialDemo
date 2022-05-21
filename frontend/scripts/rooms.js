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

    // Join new room
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

    const roomBtn = document.createElement('button');
    roomBtn.textContent = room.roomName;
    roomBtn.classList.add('button');
    roomBtn.onclick = function () {
        joinRoom(room);
    }
    
    const item = document.createElement('li');
    item.classList.add('chat__roomName');
    item.setAttribute("id", room.roomId);
    item.append(roomBtn)

    const rooms = document.getElementById("roomList");
    rooms.appendChild(item);

    sortUlList("roomList");
}