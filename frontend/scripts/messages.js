function sendMessage(form) {
    const newMessage = form.newMessage.value

    if (newMessage) {
        socket.emit('new-message', newMessage);
        displayMessage(newMessage)
        form.newMessage.value = '';
    }

    return false;
}

function displayMessage(message) {
    const item = document.createElement('li');
    item.textContent = message;

    let messages = document.getElementById("messages");
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}