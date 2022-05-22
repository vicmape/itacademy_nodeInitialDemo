

function displayUser(user) {

    // if user already exists do nothing (due to synchronous with sockets...)
    const exists = document.getElementById(user.userId);
    if (exists) return;

    const item = document.createElement('li');
    item.classList.add('user__li');
    item.textContent = user.userName;
    item.setAttribute("id", user.userId);

    const users = document.getElementById("userList");
    users.appendChild(item);

    sortUlList("userList");
}

function deleteUser(user){
    var item = document.getElementById(user.userId);
    if (item) item.parentNode.removeChild(item);
}