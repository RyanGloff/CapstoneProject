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
            socket.emit('player-turned', {
                direction: 'UP'
            });
            break;
        case 65:
        case 37:
            // Turning Left
            socket.emit('player-turned', {
                direction: 'LEFT'
            });
            break;
        case 83:
        case 40:
            // Turning Down
            socket.emit('player-turned', {
                direction: 'DOWN'
            });
            break;
        case 68:
        case 39:
            // Turning Right
            socket.emit('player-turned', {
                direction: 'RIGHT'
            });
            break;
    }
}

document.addEventListener('keydown', keyPressed);

var username;

function submit () {
    socket.emit('login', {
        username: usernameField.value,
        password: passwordField.value
    });
    loginDOM.style.display = 'none';
    logoutDOM.style.display = 'block';
}

function logout () {
    socket.emit('log-out', {});
    loginDOM.style.display = 'block';
    logoutDOM.style.display = 'none';
}