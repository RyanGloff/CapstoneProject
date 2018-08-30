function addHandlers (socket, io, db, game) {
    socket.on('player-turn-left', (data) => {
        if (socket.username === undefined) return;
        game.playerTurnLeft(socket.username);
        io.emit('player-turn-left', {
            user: socket.username,
            data: data
        });
    });
    socket.on('player-turn-right', (data) => {
        if (socket.username === undefined) return;
        game.playerTurnRight(socket.username);
        io.emit('player-turn-right', {
            user: socket.username,
            data: data
        });
    });
}

exports.addHandlers = addHandlers;