function getRooms(){

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
                let item = document.createElement('li');
                item.textContent = elem.name;
                item.setAttribute("id", elem._id);

                let btn = document.createElement("button");
                btn.innerHTML = "x";
                btn.onclick = function (){
                    deleteRoom(elem._id);
                }
                item.append(btn)
                
                roomList.appendChild(item);
            })
            sortUlList("rooms");
        }
    })
    .catch(err => {
        console.log(err.message)
    });
}

getRooms();