function createRoom(form) {
    const newRoomName = form.newRoom.value

    if (newRoomName) {
        socket.emit('new-room', newRoomName)

        form.newRoom.value = '';
    }

    return false;
}

function displayRoom(room) {
    const item = document.createElement('li');
    item.textContent = room.roomName;
    item.setAttribute("id", room.roomId);

    let rooms = document.getElementById("roomList");
    rooms.appendChild(item);
    rooms.scrollTop = messages.scrollHeight;

    sortUlList("roomList");
}