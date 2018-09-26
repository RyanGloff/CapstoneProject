socket.on('login-success', (data) => {
    console.log('login successful');
    username = data.username;
    users = data.users;

    console.log("creating player sprite");
    game.addPlayer(data.username);
});

socket.on('login-failed', (data) => {
    console.log('login failed.', data.err);
});

socket.on('user-connected', (data) => {
    if (data.username === username) return;
    addUser(data.username);
});

socket.on('log-out-success', (data) => {
    console.log('logged out');
    removeUser(data.username);
})

socket.on('user-disconnected', (data) => {
    removeUser(data.username);
});