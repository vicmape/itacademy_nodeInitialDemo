registerForm.addEventListener("submit", e => {
    e.preventDefault();

    sessionStorage.clear();

    const userName = registerForm.userName.value;
    const password = registerForm.password.value;
    const repassword = registerForm.repassword.value;

    if (password !== repassword) {
        document.getElementById("register_error").innerHTML = 'Your passwords do not match';
        return;
    }

    fetch('http://localhost:8080/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName, password, repassword})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            window.location.assign('../views/index.html')
        } else {
            alert(data.message)
        }
    }).catch(err => alert(err.message));

})