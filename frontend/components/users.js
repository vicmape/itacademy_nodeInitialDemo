function addUser(user) {
    console.log("ADD USER", user)
    let userList = document.getElementById("roomUsers");
    
    // // if it already exists, get out of here
    // // TODO: do this better...
    // var exists = document.getElementById(user.userId);
    // if (exists) return

    let item = document.createElement('li');
    item.textContent = user.userName;
    item.setAttribute("id", user.userId); 
    userList.appendChild(item);

    sortUlList("roomUsers");
}

function removeUser(user) {
    console.log("REMOVE USER", user)
    var item = document.getElementById(user.userId);
    if (item) item.parentNode.removeChild(item);
    else console.log("USER NOT FOUND");
}