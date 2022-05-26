function createRoom() {
    const newRoomName = document.getElementById("roomForm").newRoom.value;

    document.getElementById("roomSuccess").innerHTML = "";
    
    // Check for regex
    if (/^\s/.test(newRoomName)) {
        document.getElementById("roomError").innerHTML = "Room name cannot start with space";
    } else if (/\s$/.test(newRoomName)) {
        document.getElementById("roomError").innerHTML = "Room name cannot end with space";
    } else if (/\s{2}/.test(newRoomName)) {
        document.getElementById("roomError").innerHTML = "Room name cannot have two spaces";
    } else {
        // We are good. Then proceed with room creation
        if (newRoomName) {
            socket.emit('new-room', newRoomName)
            document.getElementById("roomForm").newRoom.value = '';
        }
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

    // Delete every error/success message
    document.getElementById("roomError").innerHTML = "";
    document.getElementById("roomSuccess").innerHTML = "";
    document.getElementById("roomForm").newRoom.value = "";
    document.getElementById("messageForm").newMessage.value = "";

    document.getElementById("newMessage").focus();
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