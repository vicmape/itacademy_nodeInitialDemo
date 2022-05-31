function sortUlList(ul) {
    let list = document.getElementById(ul);
    Array.from(list.getElementsByTagName("LI"))
        .sort((a, b) => {
            return a.textContent.localeCompare(b.textContent)
        })
        .forEach(li => list.appendChild(li));
}

function sortBtnList(btn) {
    let list = document.getElementById(btn);
    let arr = Array.from(list.getElementsByTagName("BUTTON"))
    let lobby = arr.shift(); // Lobby is always first created room ever
    list.appendChild(lobby);
        arr.sort((a, b) => {
            return a.textContent.localeCompare(b.textContent)
        })
        .forEach(li => list.appendChild(li));
}

function showUsers() {

    // Delete error/success message
    document.getElementById("roomError").innerHTML = "";
    document.getElementById("roomSuccess").innerHTML = "";

    let user = document.getElementById('user');
    user.classList.toggle('responsive');

    let room = document.getElementById('room');
    room.classList.toggle('d-none');

    let chat = document.getElementById('chat');
    chat.classList.toggle('d-none');
    
    if (user.classList.contains('responsive')){
        let userList = document.getElementById('userList');
        userList.addEventListener('click', e => {
            e.preventDefault();
            user.classList.remove('responsive');
            room.classList.remove('d-none');
            chat.classList.remove('d-none');

            // Delete error/success message
            document.getElementById("roomError").innerHTML = "";
            document.getElementById("roomSuccess").innerHTML = "";
        });
    }
}

function showRooms() {

    // Delete error/success message
    document.getElementById("roomError").innerHTML = "";
    document.getElementById("roomSuccess").innerHTML = "";

    let room = document.getElementById('room');
    room.classList.toggle('responsive');

    let user = document.getElementById('user');
    user.classList.toggle('d-none');

    let chat = document.getElementById('chat');
    chat.classList.toggle('d-none');

    if (room.classList.contains('responsive')){
        let roomList = document.getElementById('roomList');
        roomList.addEventListener('click', e => {
            e.preventDefault();
            room.classList.remove('responsive');
            user.classList.remove('d-none');
            chat.classList.remove('d-none');

            // Delete error/success message
            document.getElementById("roomError").innerHTML = "";
            document.getElementById("roomSuccess").innerHTML = "";
        });
    }
}