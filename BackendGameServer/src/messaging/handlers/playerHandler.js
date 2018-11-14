const CONSTANTS = require('./../../game/gameConstants');

var MessageEmitter = require('./../messageEmitter');

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
        MessageEmitter.sendPlayerTurned(io, socket.username, game.getPlayer(socket.username).x, game.getPlayer(socket.username).y, data.direction);
    });
}

exports.addHandlers = addHandlers;