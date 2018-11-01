var MessageEmitter = require('./../messageEmitter');

function addHandlers (socket, io, db, game) {
    socket.on('login', async function (data) {
        if (await db.validateUser(data.username, data.password)) {
            if (!game.containsUser(data.username)) {
                // Login success
                if (socket.username !== undefined) {
                    MessageEmitter.sendLoginFailed(socket, 'Still logged in as someone else');
                    return;
                }
                game.addUser(data.username);
                socket.username = data.username;
                MessageEmitter.sendLoginSuccess(socket, game.getUsers(), data.username);
                MessageEmitter.sendUserConnected(io, data.username);
                console.log('Log in was successful,', data.username);
            } else {
                MessageEmitter.sendLoginFailed(socket, 'Already logger on');
                console.log('Duplicate log in attempted.', data.username);
            }
        } else {
            MessageEmitter.sendLoginFailed(socket, 'Invalid credentials', data);
            console.log('Invalid login credentials received.', data);
        }
    });

    socket.on('log-out', (data) => {
        if (socket.username === undefined) return;
        game.removeUser(socket.username);
        console.log(socket.username, 'logging out');
        MessageEmitter.sendLogoutSuccess(socket, socket.username);
        MessageEmitter.sendUserDisconnected(io, socket.username);
        socket.username = undefined;
    });

    socket.on('disconnect', (data) => {
        if (socket.username === undefined) return;
        console.log('disconnecting');
        game.removeUser(socket.username);
        MessageEmitter.sendUserDisconnected(io, socket.username);
        socket.username = undefined;
    });
}

exports.addHandlers = addHandlers;