function deleteRoom(roomId) {
    fetch('http://localhost:8080/rooms', {
        method: 'delete',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: roomId })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.status === "success") {
        }
    })
    .catch(err => {
        console.log(err.message)
    });

    return false;
}