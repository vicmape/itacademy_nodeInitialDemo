registerForm.addEventListener("submit", e => {
    e.preventDefault();

    sessionStorage.clear();

    const userName = registerForm.userName.value;
    const password = registerForm.password.value;

    fetch('http://localhost:8080/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName, password})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            window.location.assign('../views/login.html')
        } else {
            alert(data.message)
        }
    }).catch(err => alert(err.message));

})