function addHandlers (socket, io, db, game) {
    socket.on('login', (data) => {
        if (db.validateUser(data.username, data.password)) {
            if (!game.containsUser(data.username)) {
                // Login success
                game.addUser(data.username);
                socket.username = data.username;
                socket.emit('login-success', {
                    users: game.getUsers(),
                    username: data.username
                });
                io.emit('user-connected', {
                    username: data.username
                });
                console.log('Log in was successful,', data.username);
            } else {
                socket.emit('login-failed', {
                    err: 'Already logged on',
                    data: data
                });
                socket.disconnect('Account already logged in');
                console.log('Duplicate log in attempted.', data.username);
            }
        } else {
            socket.emit('login-failed', {
                err: 'Invalid credentials',
                data: data
            });
            socket.disconnect('Unauthorized');
            console.log('Invalid login credentials received.', data);
        }
    });

    socket.on('disconnect', (data) => {
        if (socket.username === undefined) return false;
        console.log('disconnecting');
        game.removeUser(socket.username);
    });
}

exports.addHandlers = addHandlers;