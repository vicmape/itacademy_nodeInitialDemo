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
    Array.from(list.getElementsByTagName("BUTTON"))
        .sort((a, b) => {
            return a.textContent.localeCompare(b.textContent)
        })
        .forEach(li => list.appendChild(li));
}

function showUsers() {
    let userList = document.getElementById('user');
    userList.classList.toggle('responsive');

    let roomList = document.getElementById('room');
    roomList.classList.toggle('d-none');

    let chat = document.getElementById('chat');
    chat.classList.toggle('d-none');
}

function showRooms() {
    let roomList = document.getElementById('room');
    roomList.classList.toggle('responsive');

    let userList = document.getElementById('user');
    userList.classList.toggle('d-none');

    let chat = document.getElementById('chat');
    chat.classList.toggle('d-none');
}