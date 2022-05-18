function getAllRooms(){

    fetch('http://localhost:8080/rooms', {
        method: 'get',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            
            let roomList = document.getElementById("rooms")
            roomList.innerHTML = "";
            data.rooms.forEach(elem => {
               addRoom(elem)
            })
        }
    })
    .catch(err => {
        console.log(err.message)
    });
}

getAllRooms();