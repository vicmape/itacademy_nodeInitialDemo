

function displayUsers(users) {

    const userListRight = document.getElementById("userListRight");
    userListRight.innerHTML = "";

    const userListLeft = document.getElementById("userListLeft");
    userListLeft.innerHTML = "";

    // Iterate over all users array
    users.forEach(u => {
        // Create the user 'li' element
        const li = document.createElement('li');
        li.classList.add('user__li');
        li.textContent = u.userName;
        li.setAttribute("id", u.userId);

        const li2 = document.createElement('li');
        li2.classList.add('user__li');
        li2.textContent = u.userName;
        li2.setAttribute("id", u.userId);

        // Append the user to the userListRight
        userListRight.appendChild(li);
        userListLeft.appendChild(li2);
    });

    sortUlList("userListRight");
    sortUlList("userListLeft");
}

function deleteUser(user){
    var item = document.getElementById(user.userId);
    if (item) item.parentNode.removeChild(item);
}