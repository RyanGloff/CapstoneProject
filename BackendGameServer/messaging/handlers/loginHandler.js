function addHandlers (socket, io, db, game) {
    socket.on('login', async function (data) {
        if (await db.validateUser(data.username, data.password)) {
            if (!game.containsUser(data.username)) {
                // Login success
                if (socket.username !== undefined) {
                    socket.emit('login-failed', {
                        err: 'Still logged in as someone else',
                    });
                    return;
                }
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
                console.log('Duplicate log in attempted.', data.username);
            }
        } else {
            socket.emit('login-failed', {
                err: 'Invalid credentials',
                data: data
            });
            console.log('Invalid login credentials received.', data);
        }
    });

    socket.on('log-out', (data) => {
        if (socket.username === undefined) return;
        game.removeUser(socket.username);
        console.log(socket.username, 'logging out');
        socket.emit('log-out-success', { username: socket.username });
        socket.username = undefined;
    });

    socket.on('disconnect', (data) => {
        if (socket.username === undefined) return;
        console.log('disconnecting');
        game.removeUser(socket.username);
        socket.username = undefined;
    });
}

exports.addHandlers = addHandlers;