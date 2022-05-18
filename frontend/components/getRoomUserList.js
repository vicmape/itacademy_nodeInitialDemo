
function getRoomUserList(room) {

    fetch(`http://localhost:8080/rooms/${room.id}/users`, {
        method: 'get',
        headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {

            console.log("GET ROOM USER LIST SUCCESS")
            console.log("DATA", data)
            console.log("USER LIST", data.room.usersConnected)

            let roomUserList = document.getElementById("users")
            roomUserList.innerHTML = "";

            data.room.usersConnected.forEach(user => {
               addUser(user)
            })
        }
    })
    .catch(err => {
        console.log(err.message)
    });
}

function addUser(user) {
    console.log("USER", user)
    let userList = document.getElementById("users");
    let item = document.createElement('li');
    item.textContent = user;
    // TODO: I know this is wrong and this should be the ID of the user.
    // I trust that Victor will do the things rigth and usernames cannot be repeated...
    item.setAttribute("id", user); 

    userList.appendChild(item);

    sortUlList("users");
}

function deleteUser(room){

}