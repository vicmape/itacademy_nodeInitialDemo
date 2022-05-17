function getRooms(){

    fetch('http://localhost:8080/rooms', {
        method: 'get',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.status === "success") {
            document.getElementById("rooms").innerHTML = "";
            data.rooms.forEach(elem => {
                let item = document.createElement('li');
                item.textContent = elem;
                rooms.appendChild(item);
            })
        }
    })
    .catch(err => {
        console.log(err.message)
    });
}

getRooms();