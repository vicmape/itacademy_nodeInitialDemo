function login(form){
    fetch('http://localhost:8080/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName: form.userName.value, password: form.password.value})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.status === "success") {
            sessionStorage.userName = data.userName;
            sessionStorage.userId = data.userId;
            sessionStorage.accessToken = data.accessToken;
            window.location.assign('chat.html');
        } else {
            sessionStorage.clear();
            alert(data.message)
        }
    }).catch(err => alert(err.message));

    return false;
}
