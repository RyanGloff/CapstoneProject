// Dom Elements
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const loginDOM = document.getElementById('login-wrapper');
const logoutDOM = document.getElementById('logout-wrapper');

var socket = io();

function keyPressed (e) {
    let key = e.keyCode;
    switch (key) {
        case 87:
        case 38:
            // Turning Up
            MessageEmitter.sendPlayerTurned(socket, 'UP');
            break;
        case 65:
        case 37:
            // Turning Left
            MessageEmitter.sendPlayerTurned(socket, 'LEFT');
            break;
        case 83:
        case 40:
            // Turning Down
            MessageEmitter.sendPlayerTurned(socket, 'DOWN');
            break;
        case 68:
        case 39:
            // Turning Right
            MessageEmitter.sendPlayerTurned(socket, 'RIGHT');
            break;
    }
}

document.addEventListener('keydown', keyPressed);

var username;

function submit () {
    MessageEmitter.sendLogin(socket, usernameField.value, passwordField.value);
    loginDOM.style.display = 'none';
    logoutDOM.style.display = 'block';
}

function logout () {
    MessageEmitter.sendLogout(socket);
    loginDOM.style.display = 'block';
    logoutDOM.style.display = 'none';
}