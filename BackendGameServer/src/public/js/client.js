// Dom Elements
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const loginDOM = document.getElementById('login-wrapper');
const logoutDOM = document.getElementById('logout-wrapper');

var socket = io();

var username;

function submit () {
    MessageEmitter.sendLogin(socket, usernameField.value, passwordField.value);
}

function logout () {
    MessageEmitter.sendLogout(socket);
}