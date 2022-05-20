function sendMessage(form) {
    const newMessage = form.newMessage.value

    if (newMessage) {

        const item = document.createElement('li');
        item.textContent = newMessage;

        let messages = document.getElementById("messages");
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;

        form.newMessage.value = '';
    }

    return false;
}