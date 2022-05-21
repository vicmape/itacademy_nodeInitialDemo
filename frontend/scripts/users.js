

function displayUser(user) {

    const item = document.createElement('li');
    item.classList.add('chat__userName');
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