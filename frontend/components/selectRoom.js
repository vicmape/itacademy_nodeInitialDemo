function socketRoomUserList(room) {
    //Socket on room users
    //console.log("ROOM ID", room.id)
    const socketRoomUserList = `room_${room.id}_users`;
    console.log("SOCKET ON", socketRoomUserList);

    socket.on(socketRoomUserList, function(data) {
        console.log("SOCKET ROOM USER LIST", data)
        if (data.cmd === "add") {
            console.log("ADD USER", data)
            addUser(data.userName)
        } else if (data.cmd === "delete"){
            console.log("DELETE USER", data)
            var item = document.getElementById(data.userName);
            if (item) {
                console.log("REMOVED")
                item.parentNode.removeChild(item);
            }
            else console.log("NOT FOUND")
        }
    });
}

function selectRoom(room) {

    document.getElementById("roomName").innerHTML = `ROOM: ${room.name}`;
    
    // If we are in the same room do nothing
    if (sessionStorage.currentRoomId !== room.id) {

        sessionStorage.currentRoomName = room.name
        sessionStorage.currentRoomId = room.id

        fetch(`http://localhost:8080/rooms/${room.id}`, {
            method: 'get',
            headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                console.log("SELECT ROOM SUCCESS")
                getRoomUserList(room);
                socketRoomUserList(room);
            }
        })
        .catch(err => {
            console.log(err.message)
        });
    }
}
