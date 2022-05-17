function register(form){
    fetch('http://localhost:8080/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username: form.username.value, password: form.password.value})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
        window.location.assign('index.html')
        } else {
            alert(data.message)
        }
    }).catch(err => console.log(err.message));

    return false;
}
