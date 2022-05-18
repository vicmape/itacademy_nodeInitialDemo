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

function addRoom(data){
    let roomList = document.getElementById("rooms");
    let item = document.createElement('li');
    item.textContent = data.name;
    item.setAttribute("id", data._id);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add('chat__rooms__button__delete');
    deleteBtn.onclick = function (){
        deleteRoom(data._id);
    }

    let selectBtn = document.createElement("button");
    selectBtn.classList.add('chat__rooms__button__select');
    selectBtn.onclick = function (){
        selectRoom(data);
    }

    item.append(deleteBtn)
    item.append(selectBtn)

    roomList.appendChild(item);

    sortUlList("rooms");
}