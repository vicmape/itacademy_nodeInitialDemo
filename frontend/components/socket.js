const socket = io.connect('http://localhost:8080');

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
    objDiv.scrollTop = objDiv.scrollHeight;

});

socket.on('rooms', function(data) {
    if (data.cmd === "add") {
        let roomList = document.getElementById("rooms");
        let item = document.createElement('li');
        item.textContent = data.name;
        item.setAttribute("id", data._id);

        let btn = document.createElement("button");
        btn.innerHTML = "x";
        btn.onclick = function (){
            deleteRoom(data._id);
        }
        item.append(btn)

        roomList.appendChild(item);

        sortUlList("rooms");
    } else if (data.cmd === "delete"){
        var item = document.getElementById(data._id);
        item.parentNode.removeChild(item);
    }
});
