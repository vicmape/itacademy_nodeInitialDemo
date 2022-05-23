function sendMessage(form) {
    const text = form.newMessage.value;
    const user = {userId: sessionStorage.userId, userName: sessionStorage.userName};
    const room = {roomId: sessionStorage.roomId, roomName: sessionStorage.roomName};

    if (text) {
        let message = {user, room, text};
        socket.emit('new-message', message);
        displayMessage(message);
        form.newMessage.value = '';
    }

    return false;
}


function displayMessage(message) {

    let messageList = document.getElementById("messageList");

    // Create the element to append
    let li = document.createElement('li');
    li.classList.add('chat__li')
    li.textContent = message.text;

    // Get the last inserted Ul
    let ul = document.getElementById('lastMessage');

    // If last inserted ul has the same userId then append and we are done.
    if (ul && (ul.getAttribute('userId') === message.user.userId)) {
        // Same user, append message to last ul.
        ul.appendChild(li)
    } else {
        if (ul) document.getElementById("lastMessage").removeAttribute("id");

        // Create new ul
        ul = document.createElement('ul');
        ul.setAttribute('id', 'lastMessage');
        ul.setAttribute('userId', message.user.userId)

        // my messages will be aligned different
        if (message.user.userId === sessionStorage.userId) {
            ul.classList.add('myMessage')
        } else {
            const name = document.createElement('li')
            name.textContent = message.user.userName;
            messageList.appendChild(name);
            ul.classList.add('notMyMessage')
        }
        
        ul.appendChild(li);

        messageList.appendChild(ul);
    }

    messageList.scrollTop = messageList.scrollHeight;
}

function displayJoinMessage(message) {

    // console.log('displayJoinMessage', message)

    document.getElementById('lastMessage').removeAttribute('id');

    let messageList = document.getElementById('messageList');

    // Create the element to append
    let li = document.createElement('li');
    li.classList.add('chat__li--join')
    li.textContent = message;
    li.setAttribute('id', 'lastMessage');

    messageList.appendChild(li);
    messageList.scrollTop = messageList.scrollHeight;
}
