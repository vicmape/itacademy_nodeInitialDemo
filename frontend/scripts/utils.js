function sortUlList(ul) {
    var ul = document.getElementById(ul);
    Array.from(ul.getElementsByTagName("LI"))
        .sort((a, b) => {
            return a.textContent.localeCompare(b.textContent)
        })
        .forEach(li => ul.appendChild(li));
}

function sortBtnList(btn) {
    var btn = document.getElementById(btn);
    Array.from(btn.getElementsByTagName("BUTTON"))
        .sort((a, b) => {
            return a.textContent.localeCompare(b.textContent)
        })
        .forEach(li => btn.appendChild(li));
}

function showUsers() {
    var userList = document.getElementById('userList');
    userList.classList.toggle('responsive');
}

function showRooms() {
    var roomList = document.getElementById('roomList');
    roomList.classList.toggle('responsive');
    
    var roomForm = document.getElementById('roomForm');
    roomForm.classList.toggle('responsive');
}