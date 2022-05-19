function logout(){
    sessionStorage.clear();
    window.location.assign('./index.html')
}

function clearStorage(){
    sessionStorage.clear();
    console.log("session storage cleared")
}
