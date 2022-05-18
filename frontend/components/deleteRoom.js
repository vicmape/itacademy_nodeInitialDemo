function deleteRoom(room) {
    console.log("deleteRoom")
    fetch(`http://localhost:8080/rooms/${room.id}`, {
        method: 'delete',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}`, 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            console.log("DELETE DATA", data)
            if (sessionStorage.currentRoomName === room.name){
                document.getElementById("roomName").innerHTML = '';
                sessionStorage.currentRoomName = '';
                sessionStorage.currentRoomId = '';
            }
        }
    })
    .catch(err => {
        console.log(err.message)
    });
    return false;
}