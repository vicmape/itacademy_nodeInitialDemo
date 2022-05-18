function selectRoom(room) {
    sessionStorage.currentRoomName = room.name
    sessionStorage.currentRoomId = room._id

    document.getElementById("roomName").innerHTML = sessionStorage.currentRoomName;

    fetch(`http://localhost:8080/rooms/${sessionStorage.currentRoomId}`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
        }
    })
    .catch(err => {
        console.log(err.message)
    });
}
