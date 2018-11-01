const dbConnector = require('./../db/dbConnector');
const gameLogic = require('./../game/gameLogic');

// Handlers
const loginHandler = require('./handlers/loginHandler');
const playerHandler = require('./handlers/playerHandler');

function addHandlers (socket, io) {
    loginHandler.addHandlers(socket, io, dbConnector, gameLogic);
    playerHandler.addHandlers(socket, io, dbConnector, gameLogic);
}

function addConnection (socket, io) {
    addHandlers(socket, io);
    gameLogic.start(io);
}

exports.addConnection = addConnection;