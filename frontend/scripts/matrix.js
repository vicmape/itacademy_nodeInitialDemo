function matrix() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    let current = document.getElementById("matrix").innerHTML;

    if (current === "Wake up") {
        document.getElementById("matrix").innerHTML = 'Keep dreaming';
    } else {
        document.getElementById("matrix").innerHTML = 'Wake up';
    }
}