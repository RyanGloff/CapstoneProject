socket.on('login-success', (data) => {
    username = data.username;
    game.addPlayer(data.username, data.users[data.username].x, data.users[data.username].y, data.users[data.username].color, data.users[data.username].direction.str);
    loginDOM.style.display = 'none';
    logoutDOM.style.display = 'block';
});

socket.on('login-failed', (data) => {
    console.log('login failed.', data.err);
});

socket.on('logout-success', (data) => {
    loginDOM.style.display = 'block';
    logoutDOM.style.display = 'none';
})

socket.on('user-disconnected', (data) => {
    game.removePlayer(data.username);
});