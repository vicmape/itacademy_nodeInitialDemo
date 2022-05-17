fetch('http://localhost:8080/auth', {
    method: 'post',
    headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
})
.then(response => response.json())
.then(data => {
    if (data.status !== "success") {
        logout()
    }
})
.catch(err => {
    logout();
});
