function addUser(user) {
    let userList = document.getElementById("roomUsers");
    
    // if it already exists, get out of here
    // TODO: do this better...
    var exists = document.getElementById(user.userId);
    if (exists) return

    let item = document.createElement('li');
    item.textContent = user.userName;
    item.setAttribute("id", user.userId); 
    userList.appendChild(item);

    sortUlList("roomUsers");
}

function removeUser(data) {
    console.log("REMOVE USER", data)
    var item = document.getElementById(data.userId);
    if (item) item.parentNode.removeChild(item);
    else console.log("USER NOT FOUND");
}