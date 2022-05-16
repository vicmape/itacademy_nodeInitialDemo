// var socket = io.connect('http://localhost:8080', { 'forceNew': true }); 

// socket.on('messages', data => {
//   console.log(data)
//   render(data)
// });

// function render(data) { 
//   var html = data.map(function(elem, index){ 
//     return(`<div>
//               <strong>${elem.author}</strong>: 
//               <em>${elem.text}</em>
//             </div>`) 
//     }).join(" "); 
//    document.getElementById('messages').innerHTML = html; 
// }

// function addMessage(e) { 
//   var message = { 
//     author: document.getElementById('username').value, 
//     text: document.getElementById('texto').value 
//   }; 
//   socket.emit('new-message', message);
//   return false; 
// }

function registerUser(e, form){
  console.log("hola caracola")
  console.log(e)
  console.log(form)
  // e.preventDefault();
  // fetch('http://localhost:8080/register', {
  //   method: 'post',
  //   body: JSON.stringify({name: form.username.value, email: form.password.value})
  // }).then(function(response) {
  //   console.log(`response ${response}`)
  //   return response.json();
  // }).then(function(data) {
  //   //Success code goes here
  //   console.log(`data ${data}`)
  //   alert('form submited')
  // }).catch(function(err) {
  //   //Failure
  //   alert('Error')
  // });
  // console.log("bye caracola")
    return false; 
}