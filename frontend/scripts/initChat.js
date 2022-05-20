// Print sessionStorage variables
console.log(`userName: ${sessionStorage.userName}`)
console.log(`userId: ${sessionStorage.userId}`)
console.log(`accessToken: ${sessionStorage.accessToken}`)

// Set username in chat window
document.getElementById("userName").innerHTML = `USER: ${sessionStorage.userName}`;

if (sessionStorage.roomName) {
    document.getElementById("roomName").innerHTML = `ROOM: ${sessionStorage.roomName}`;
} else {
    document.getElementById("roomName").innerHTML = `ROOM: General room`;
}