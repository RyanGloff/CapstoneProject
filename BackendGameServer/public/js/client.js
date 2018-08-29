// Dom Elements
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');

var socket = io();

var username;
var users = [];

socket.on('login-success', (data) => {
    console.log('login successful');
    username = data.username;
    users = data.users;
});

socket.on('login-failed', (data) => {
    console.log('login failed.', data.err);
});

socket.on('user-connected', (data) => {
    if (data.username === username) return;
    addUser(data.username);
});

socket.on('user-disconnected', (data) => {
    removeUser(data.username);
});

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