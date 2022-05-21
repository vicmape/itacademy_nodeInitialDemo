function sendMessage(form) {
    const newMessage = form.newMessage.value
    const user = {userId:sessionStorage.userId, userName: sessionStorage.userName}
    const room = {roomId:sessionStorage.roomId, roomName: sessionStorage.roomName}

    if (newMessage) {
        socket.emit('new-message', user, room, newMessage);
        displayMessage(newMessage)
        form.newMessage.value = '';
    }

    return false;
}

function displayMessage(message) {
    const item = document.createElement('li');
    item.textContent = message;
    console.log(message)

    if (message.userId === sessionStorage.userId)
    {
        item.classList.add('myMessage')
    }

    let messages = document.getElementById("messageList");
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}
