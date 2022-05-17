function login(form){
    fetch('http://localhost:8080/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: form.username.value, password: form.password.value})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
        sessionStorage.accessToken = data.accessToken
        window.location.assign('chat.html')
        }
    }).catch(err => console.log(err));

    return false;
}
