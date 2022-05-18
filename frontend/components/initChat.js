
document.getElementById("userName").innerHTML = `USER: ${sessionStorage.userName}`;
sessionStorage.roomName = '';
sessionStorage.roomId = '';

getAllRooms();
socketRooms();