socket.on('login-success', (data) => {
    username = data.username;
    game.addPlayer(data.username);
});

socket.on('login-failed', (data) => {
    console.log('login failed.', data.err);
});

socket.on('log-out-success', (data) => {
    console.log('logged out');
    game.removePlayer(data.username);
})

socket.on('user-disconnected', (data) => {
    game.removePlayer(data.username);
});