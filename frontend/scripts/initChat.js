// Check if this user has a valid jwt
fetch('http://localhost:8080/auth', {
    method: 'post',
    headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
})
.then(response => response.json())
.then(data => {

    if (data.status === "success") {
        // jwt verified

        // Print sessionStorage variables
        console.log(`userName: ${sessionStorage.userName}`)
        console.log(`userId: ${sessionStorage.userId}`)
        console.log(`accessToken: ${sessionStorage.accessToken}`)

        // Set username in chat window
        document.getElementById("userName").innerHTML = `USER: ${sessionStorage.userName}`;

        // Set the room name in chat window
        if (sessionStorage.roomName) {
            document.getElementById("roomName").innerHTML = `ROOM: ${sessionStorage.roomName}`;
        } else {
            document.getElementById("roomName").innerHTML = `ROOM: General room`;
        }
    } else {
        // jwt verification failed
        logout()
    }
})
.catch(err => {
    logout();
});
