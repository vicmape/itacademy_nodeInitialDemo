loginForm.addEventListener("submit", e => {
    e.preventDefault();

    sessionStorage.clear();

    const userName = loginForm.userName.value;
    const password = loginForm.password.value;

    fetch('http://localhost:8080/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName, password})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            sessionStorage.userName = data.userName;
            sessionStorage.userId = data.userId;
            sessionStorage.accessToken = data.accessToken;
            window.location.assign('chat.html');
        } else {
            alert(data.message)
        }
    }).catch(err => alert(err.message));

})