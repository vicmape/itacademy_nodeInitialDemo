function matrix() {
    var r = document.querySelector(':root');
    let current = document.getElementById("matrix").innerHTML;

    if (current === "light") {
        document.getElementById("matrix").innerHTML = 'matrix';

        r.style.setProperty("--color", "black");
        r.style.setProperty("--background-color", "white");
    } else {
        document.getElementById("matrix").innerHTML = 'light';
        
        r.style.setProperty("--color", "lime");
        r.style.setProperty("--background-color", "black");
    }
}