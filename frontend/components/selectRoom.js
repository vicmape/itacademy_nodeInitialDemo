function selectRoom(room) {
    console.log(`Room selected name=${room.name} id=${room._id}`)
    document.getElementById("roomName").innerHTML = room.name;
    sessionStorage.currentRoomName = room.name
    sessionStorage.currentRoomId = room.id
}
