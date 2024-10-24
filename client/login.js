let enterButton = document.querySelector("#enter-button");
let username = document.querySelector("#name");

function changePage() {
    if(username.value.trim() != "") {
        sessionStorage.setItem("username", username.value.trim());
        window.location.href = 'home.html';
    }
}

enterButton.onclick = changePage;