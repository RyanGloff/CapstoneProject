const dbConnector = require('./../db/dbConnector');
const gameLogic = require('./../game/gameLogic');

// Handlers
const loginHandler = require('./handlers/loginHandler');

function addHandlers (socket, io) {
    loginHandler.addHandlers(socket, io, dbConnector, gameLogic);
}

function addConnection (socket, io) {
    addHandlers(socket, io);
}

exports.addConnection = addConnection;