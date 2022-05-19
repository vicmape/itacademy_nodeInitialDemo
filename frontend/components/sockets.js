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

socket.on('connect', () => console.log(`You connected with socket id: ${socket.id}`));

socket.on('messages', function(msg) {
    var item = document.createElement('li');
    let objDiv = document.getElementById("messages");
    item.textContent = msg;
    messages.appendChild(item);
    objDiv.scrollTop = objDiv.scrollHeight;
});


socket.on('rooms', function(data) {
    if (data.cmd === "add") {
        addRoom(data)
    } else if (data.cmd === "delete"){
        removeRoom(data);
    }
});


function socketRoomUserList(room) {

    // // Leave old room
    // socket.leave(sessionStorage.socketRoomUser);

    // // Build the new room name
    // const socketRoomUserList = `room_${room.roomId}_users`;

    // // Update stored room user socket
    // sessionStorage.socketRoomUser = socketRoomUserList;

    // // Join new room
    // socket.join(socketRoomUserList, function());


    // // Remove the old socket
    // socket.off( sessionStorage.socketRoomUser, data => {
    //     console.log(`SOCKET OFF: ${socketRoomUserList}`)
    // });





    console.log(`SOCKET ON: ${socketRoomUserList}`)
    socket.once(socketRoomUserList, function(data) {
        console.log("CURRENT SOCKET", socketRoomUserList);

        if (data.cmd === "add") addUser(data);  
        else if (data.cmd === "delete") removeUser(data);
        else alert("socketRoomUserList error")
    });
}
