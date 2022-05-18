function register(form){
    fetch('http://localhost:8080/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName: form.userName.value, password: form.password.value})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.status === "success") {
        window.location.assign('index.html')
        } else {
            alert(data.message)
        }
    }).catch(err => alert(err.message));

    return false;
}
