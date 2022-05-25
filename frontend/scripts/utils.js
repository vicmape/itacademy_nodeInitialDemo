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
    var x = document.getElementById('userList');
    x.style['background-color'] = 'red';
    x.style['display'] = 'block';
}

function showRooms() {
    var x = document.getElementById('roomList');
    x.style['background-color'] = 'red';
    x.style['display'] = 'block';

    var x = document.getElementById('room__form');
    x.style['background-color'] = 'red';
    x.style['display'] = 'flex';

}