// Dummy anti hotlinking
// TODO: Do this properly once this is in production.
if (!sessionStorage.accessToken) {
    window.location.assign('index.html');
}

document.getElementById("userName").innerHTML = `${sessionStorage.userName}`;

document.getElementById("messageList").innerHTML = '';
//document.getElementById("userList").innerHTML = '';
document.getElementById("roomList").innerHTML = '';

sessionStorage.roomId = '';
sessionStorage.roomName = '';
