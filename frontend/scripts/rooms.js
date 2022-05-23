function createRoom(form) {
    const newRoomName = form.newRoom.value

    if (newRoomName) {
        socket.emit('new-room', newRoomName)

        form.newRoom.value = '';
    }

    return false;
}
function joinRoom(room) {
    // console.log('joinRoom', room)

    // If we are in the same room do nothing
    if (sessionStorage.roomId === room.roomId) return;

    // Inform the server we are joining new room
    socket.emit('join-room', room);

    // Update session storage variables
    sessionStorage.roomName = room.roomName;
    sessionStorage.roomId = room.roomId;

    // Change room name
    document.getElementById("roomName").innerHTML = `ROOM: ${room.roomName}`;

    // Delete messages
    document.getElementById("messageList").innerHTML = "";
}

function displayRoom(room) {

    const li = document.createElement('button');

    if (room.roomName === 'Lobby') {
        li.classList.add('room__li--active');
        joinRoom(room);
    }

    const span = document.createElement('span');
    span.innerText = 'test'
    li.append(span)

    li.textContent = room.roomName;
    li.setAttribute('id', room.roomId);
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

    sortBtnList("roomList");
}


function displayRoomUsers(room, users) {
    document.getElementById(room.roomId).textContent = `${room.roomName} (${users.length})`
}