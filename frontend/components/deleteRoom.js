function deleteRoom(room) {
    fetch('http://localhost:8080/rooms', {
        method: 'delete',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: room._id })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
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