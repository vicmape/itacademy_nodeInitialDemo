

function displayUsers(users) {

    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    // Iterate over all users array
    users.forEach(u => {
        // Create the user 'li' element
        const li = document.createElement('li');
        li.classList.add('user__li');
        li.textContent = u.userName;
        li.setAttribute("id", u.userId);

        // Append the user to the userList
        userList.appendChild(li);
    });

    sortUlList("userList");
}

function deleteUser(user){
    var item = document.getElementById(user.userId);
    if (item) item.parentNode.removeChild(item);
}