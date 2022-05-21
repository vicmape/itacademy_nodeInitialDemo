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
    roomBtn.setAttribute("id", room.roomId);
    roomBtn.onclick = () => {

        if (sessionStorage.roomId) {
            document.getElementById(sessionStorage.roomId).classList.remove('chat__roomName--active')
        }

        roomBtn.classList.add('chat__roomName--active')
        console.log("COLOR TO: ", sessionStorage.roomId);
        joinRoom(room);
    }
    
    const item = document.createElement('li');
    item.classList.add('chat__roomName');
    item.append(roomBtn)

    const rooms = document.getElementById("roomList");
    rooms.appendChild(item);

    sortUlList("roomList");
}