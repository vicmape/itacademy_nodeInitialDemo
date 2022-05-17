
var socket = io.connect('http://localhost:8080');

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.emit('new-message', input.value);
        input.value = '';
    }
});

socket.on('messages', function(msg) {
    var item = document.createElement('li');
    let objDiv = document.getElementById("messages");
    item.textContent = msg;
    messages.appendChild(item);
    // window.scrollTo(0, document.getElementById('messages').scrollHeight);
    objDiv.scrollTop = objDiv.scrollHeight;

});

socket.on('rooms', function(msg) {
    getRooms();
});
