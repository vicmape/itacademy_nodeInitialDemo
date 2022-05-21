function sendMessage(form) {
    const text = form.newMessage.value
    const user = {userId:sessionStorage.userId, userName: sessionStorage.userName}
    const room = {roomId:sessionStorage.roomId, roomName: sessionStorage.roomName}

    if (text) {
        let message = {user, room, text}
        socket.emit('new-message', message);
        displayMessage(message)
        form.newMessage.value = '';
    }

    return false;
}

function displayMessage(message) {
    const item = document.createElement('li');
    item.textContent = message.text;
    item.setAttribute('id', `m_${message.user.userId}`); // m_userId to avoid colission with userList

    console.log(message)

    // my messages will be aligned different
    console.log('displayMessage', message.user.userId);
    console.log('displayMessage', sessionStorage.userId);
    if (message.user.userId === sessionStorage.userId)
    {
        item.classList.add('myMessage')
    }

    let messages = document.getElementById("messageList");
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}
