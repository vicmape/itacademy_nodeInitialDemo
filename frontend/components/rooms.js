function getRoomsList() {

    fetch('http://localhost:8080/rooms', {
        method: 'get',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            // let roomList = document.getElementById("roomsList")
            // roomList.innerHTML = "";
            data.rooms.forEach(elem => addRoom(elem))
        } else {
            alert(data.message)
        }
    })
    .catch(err => alert(err.message));
}


function getRoomUsers(room) {

    fetch(`http://localhost:8080/rooms/${room.roomId}/users`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {

            // Delete room user list
            let roomUserList = document.getElementById("roomUsers")
            roomUserList.innerHTML = "";

            data.room.usersConnected.forEach(user => {
               addUser(user)
            })
        } else {
            alert(data.message)
        }
    })
    .catch(err => alert(err.message));
}


function createRoom(roomForm) {

    fetch('http://localhost:8080/rooms', {
        method: 'post',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomName: roomForm.roomName.value })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            console.log(data.message)
        } else {
            alert(data.message)
        }
    })
    .catch(err => alert(err.message));

    return false;
}

function deleteRoom(room) {
    fetch(`http://localhost:8080/rooms/${room.roomId}`, {
        method: 'delete',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}`, 'Content-Type': 'application/json' },
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success"){
            console.log(data.message)
        } else {
            alert(data.message);
        }
    })
    .catch(err => alert(err.message));

    return false;
}


function selectRoom(room) {
    
    // If we are in the same room do nothing
    if (sessionStorage.currentRoomName === room.roomName) return;

    document.getElementById("roomName").innerHTML = `ROOM: ${room.roomName}`;

    fetch(`http://localhost:8080/rooms/${room.roomId}`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            console.log(data.message)
            sessionStorage.currentRoomName = room.roomName
            sessionStorage.currentRoomId = room.roomId
            removeRoomUsers();
            getRoomUsers(room);
            socketRoomUserList(room);
        } else {
            alert(data.message);
        }
    })
    .catch(err => alert(err.message));
}

function addRoom(room){
    let roomList = document.getElementById("roomList");
    let item = document.createElement('li');
    item.textContent = room.roomName;
    item.setAttribute("id", room.roomId);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add('chat__rooms__button__delete');
    deleteBtn.onclick = function (){
        deleteRoom(room);
    }

    let selectBtn = document.createElement("button");
    selectBtn.classList.add('chat__rooms__button__select');
    selectBtn.onclick = function (){
        selectRoom(room);
    }

    item.append(deleteBtn)
    item.append(selectBtn)

    roomList.appendChild(item);

    sortUlList("roomList");
}


function removeRoom(room) {
    if (sessionStorage.currentRoomName === room.roomName){
        // TODO: go to empty (initial) chat
        document.getElementById("roomName").innerHTML = '';
        sessionStorage.currentRoomName = '';
        sessionStorage.currentRoomId = '';
    }

    var item = document.getElementById(room.roomId);
    item.parentNode.removeChild(item);
}