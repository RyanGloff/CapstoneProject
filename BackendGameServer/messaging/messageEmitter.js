// Login/logout
function sendLoginFailed (con, err, data) {
    con.emit('login-failed', {
        err: err,
        data: data
    });
}
function sendLoginSuccess (con, users, username) {
    con.emit('login-success', {
        users: users,
        username: username
    });
}
function sendLogoutSuccess (con, username) {
    con.emit('logout-success', {
        username: username
    });
}

// User add/remove
function sendUserConnected (con, username) {
    con.emit('user-connected', {
        username, username
    });
}
function sendUserDisconnected (con, username) {
    con.emit('user-disconnected', {
        username: username
    });
}

// Game play messages
function sendPlayerMoved (con, username, x, y, direction) {
    con.emit('player-set-location', {
        user: username,
        x: x,
        y: y,
        direction: direction
    });
}
function sendPlayerTurned (con, username, x, y, direction) {
    con.emit('player-turned', {
        user: username,
        location: {
            x: x,
            y: y
        },
        direction: direction
    });
}

// Time control messages
function sendHeartBeat (con, time) {
    con.emit('heartbeat', {
        time: time
    });
}

exports.sendLoginFailed = sendLoginFailed;
exports.sendLoginSuccess = sendLoginSuccess;
exports.sendLogoutSuccess = sendLogoutSuccess;
exports.sendUserConnected = sendUserConnected;
exports.sendUserDisconnected = sendUserDisconnected;
exports.sendPlayerMoved = sendPlayerMoved;
exports.sendPlayerTurned = sendPlayerTurned;
exports.sendHeartBeat = sendHeartBeat;