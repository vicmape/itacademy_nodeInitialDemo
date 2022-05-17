

//setInterval(socket.emit('new-message', "Hola from client"), 2000);

function addMessage(e) { 
  var message = { 
    author: document.getElementById('username').value, 
    text: document.getElementById('texto').value 
  }; 
  socket.emit('new-message', message);
  return false; 
}



  
    // var messages = document.getElementById('messages');
    // var form = document.getElementById('form');
    // var input = document.getElementById('input');
  
    // form.addEventListener('submit', function(e) {
    //   e.preventDefault();
    //   if (input.value) {
    //     socket.emit('new-message', input.value);
    //     input.value = '';
    //   }
    // });
  
    // socket.on('message', function(msg) {
    //   var item = document.createElement('li');
    //   item.textContent = msg;
    //   messages.appendChild(item);
    //   window.scrollTo(0, document.body.scrollHeight);
    // });

