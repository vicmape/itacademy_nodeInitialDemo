function matrix() {
    var r = document.querySelector(':root');
    let current = document.getElementById("matrix").innerHTML;

    if (current === "Wake up") {
        document.getElementById("matrix").innerHTML = 'Keep dreaming';

        r.style.setProperty("--color", "lime");
        r.style.setProperty("--background-color", "black");

        setProperty("--my-var", jsVar + 4);
    } else {
        document.getElementById("matrix").innerHTML = 'Wake up';
        r.style.setProperty("--color", "black");
        r.style.setProperty("--background-color", "white");
    }
}