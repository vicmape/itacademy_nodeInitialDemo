function sortUlList(ul) {
    var ul = document.getElementById(ul);
    Array.from(ul.getElementsByTagName("LI"))
        .sort((a, b) => {
            return a.textContent.localeCompare(b.textContent)
        })
        .forEach(li => ul.appendChild(li));
}

function sortBtnList(btn) {
    var btn = document.getElementById(btn);
    Array.from(btn.getElementsByTagName("BUTTON"))
        .sort((a, b) => {
            return a.textContent.localeCompare(b.textContent)
        })
        .forEach(li => btn.appendChild(li));
}