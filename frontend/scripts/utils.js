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
    let user = document.getElementById('user');
    user.classList.toggle('responsive');
    
    let room = document.getElementById('room');
    room.classList.toggle('d-none');
    
    let chat = document.getElementById('chat');
    chat.classList.toggle('d-none');
    
    if (user.classList.contains('responsive')){
        let userList = document.getElementById('userList');
        userList.addEventListener('click', e => {
            user.classList.remove('responsive');
            room.classList.remove('d-none');
            chat.classList.remove('d-none');
        });
    }
}

function showRooms() {
    let room = document.getElementById('room');
    room.classList.toggle('responsive');

    let user = document.getElementById('user');
    user.classList.toggle('d-none');

    let chat = document.getElementById('chat');
    chat.classList.toggle('d-none');
}