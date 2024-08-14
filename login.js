const validUsername = "valedaniel";
const validPassword = "12345";

function login(event) {
    event.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === validUsername && password === validPassword) {
        window.location.href = "encuestas.html"; 
    } else {
        document.getElementById("loginError").style.display = "block";
    }
}

