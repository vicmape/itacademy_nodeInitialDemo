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
    document.getElementById("roomName").innerHTML = `${room.roomName}`;

    // Delete messages
    document.getElementById("messageList").innerHTML = "";

    // Delete every possible error in the room error
    document.getElementById("roomError").innerHTML = "";
}

function displayRoom(room) {

    const btn = document.createElement('button');

    if (room.roomName === 'Lobby') {
        btn.classList.add('room__btn--active');
        joinRoom(room);
    }

    btn.textContent = room.roomName;
    btn.setAttribute('id', room.roomId);
    btn.classList.add('room__btn');
    btn.onclick = () => {

        if (sessionStorage.roomId) {
            document.getElementById(sessionStorage.roomId).classList.remove('room__btn--active')
        }

        btn.classList.add('room__btn--active');
        joinRoom(room);

        let r = document.getElementById('room');
        if (r.classList.contains('responsive')) {

            r.classList.remove('responsive');
            
            let user = document.getElementById('user');
            user.classList.remove('d-none');
            
            let chat = document.getElementById('chat');
            chat.classList.remove('d-none');
        }
    }

    const rooms = document.getElementById("roomList");
    rooms.appendChild(btn);

    sortBtnList("roomList");
}


function displayRoomUsers(room, users) {
    document.getElementById(room.roomId).textContent = `${room.roomName} (${users.length})`
}