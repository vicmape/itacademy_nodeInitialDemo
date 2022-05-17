fetch('http://localhost:8080/auth', {
    method: 'post',
    headers: { 'Authorization': `Bearer ${sessionStorage.accessToken}` }
})
.then(response => response.json())
.then(data => {
    if (data.status !== "success") {
    sessionStorage.clear();
    window.location.assign('index.html')
    }
})
.catch(err => {
    sessionStorage.clear();
    window.location.assign('index.html')
});
