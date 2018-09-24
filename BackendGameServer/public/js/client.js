// Dom Elements
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

var socket = io();

var username;
var users = [];

function addUser (username) {
    users.push(username);
}
function removeUser (username) {
    for (let i = 0; i < users.length; i += 1) {
        if (users[i] === username) {
            users.splice(i, 1);
            return;
        }
    }
}

function submit () {
    socket.emit('login', {
        username: usernameField.value,
        password: passwordField.value
    });
}

function logout () {
    socket.emit('log-out', {});
}

function turnLeft () {
    socket.emit('player-turn-left', {});
}
function turnRight () {
    socket.emit('player-turn-right', {});
}