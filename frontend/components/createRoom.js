function createRoom(roomForm) {
    
    fetch('http://localhost:8080/rooms', {
        method: 'post',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: roomForm.name.value })
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