const CONSTANTS = require('./../../game/gameConstants');

function addHandlers (socket, io, db, game) {
    socket.on('player-turned', (data) => {
        if (socket.username === undefined) return;
        let direction;
        switch (data.direction) {
            case 'UP':
                direction = CONSTANTS.Direction.UP;
                break;
            case 'DOWN':
                direction = CONSTANTS.Direction.DOWN;
                break;
            case 'LEFT': 
                direction = CONSTANTS.Direction.LEFT;
                break;
            case 'RIGHT':
                direction = CONSTANTS.Direction.RIGHT;
                break;
        }
        if (!CONSTANTS.Direction.validTurn(game.getPlayer(socket.username).direction, direction)) return;

        game.playerTurn(socket.username, direction);
        io.emit('player-turned', {
            user: socket.username,
            location: {
                x: game.getPlayer(socket.username).x,
                y: game.getPlayer(socket.username).y
            },
            direction: data.direction
        });
    });
}

exports.addHandlers = addHandlers;