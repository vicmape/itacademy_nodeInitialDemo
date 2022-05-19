function sortUlList(ul) {
    var ul = document.getElementById(ul);
    Array.from(ul.getElementsByTagName("LI"))
        .sort((a, b) => {
        return a.textContent.localeCompare(b.textContent)
        })
        .forEach(li => ul.appendChild(li));
}

function removeRoomUsers() {
    var roomUsers = document. getElementById('roomUsers');
    roomUsers. innerHTML = '';
}