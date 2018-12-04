socket.on('login-success', (data) => {
    username = data.username;
    console.log(username);
    for(let key in data.users) {
        let current = data.users[key];
        game.addPlayer(current.user, current.x, current.y, current.color, current.direction.str);
        console.log(current);
    }
    loginDOM.style.display = 'none';
    logoutDOM.style.display = 'block';
    slideout.close();
});

socket.on('login-failed', (data) => {
    console.log('login failed.', data.err);
});

socket.on('logout-success', (data) => {
    loginDOM.style.display = 'block';
    logoutDOM.style.display = 'none';
    slideout.close();
})

socket.on('user-disconnected', (data) => {
    game.removePlayer(data.username);
});

socket.on('user-connected', (data) => {
    console.log('new user connected');
    game.addPlayer(data.username, data.user.x, data.user.y, data.user.color, data.user.direction.str);
});