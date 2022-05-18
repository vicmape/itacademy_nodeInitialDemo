// Print sessionStorage variables
console.log(`userName: ${sessionStorage.userName}`)
console.log(`userId: ${sessionStorage.userId}`)
console.log(`accessToken: ${sessionStorage.accessToken}`)

// Set username in chat window
document.getElementById("userName").innerHTML = `USER: ${sessionStorage.userName}`;

// Delete previous rooms
sessionStorage.roomName = '';
sessionStorage.roomId = '';

// Get all the available rooms
getRoomsList();

// Listen the room socket for room changes
socketRoomList();