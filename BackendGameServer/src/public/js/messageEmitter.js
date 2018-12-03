var MessageEmitter = {
    sendPlayerTurned: function (con, direction) {
        con.emit('player-turned', {
            direction: direction
        });
    },
    sendLogin: function (con, username, password) {
        con.emit('login', {
            username: username,
            password: password
        });
    },
    sendLogout: function (con) {
        con.emit('log-out', {});
    }
};