const CONSTANTS = require('./gameConstants');

var clock;
var time = 0;

var players = {};

class Player {
    constructor(username) {
        this.x = 0.0;
        this.y = 0.0;
        this.direction = CONSTANTS.Direction.UP;
        this.user = username;
    }

    update(velocity) {
        this.x += this.direction.dx * velocity;
        this.y += this.direction.dy * velocity;
    }

    turn(direction) {
        this.direction = direction;
    }
}; 

function addUser (username) {
    players[username] = new Player(username);
}

function removeUser (username) {
    delete players[username];
}

function containsUser (username) {
    return players[username] !== undefined;
}

function getUsers () {
    return players;
}

function getPlayer (username) {
    return players[username];
}

function playerTurn (username, direction) {
    players[username].direction = direction;
}

function start (io) {
    if (clock !== undefined) return;
    time = 0;
    clock = setInterval(() => {
        time += 1;
        io.emit('heartbeat', {
            time: time
        });
        update(io);
    }, 1000 / CONSTANTS.TPS);
}

function end () {
    clearInterval(clock);
    clock = undefined;
}

function update (io) {
    var velocity = CONSTANTS.PLAYER_VELOCITY;
    for(var user in players) {
        var player = players[user];
        player.update(velocity);
        io.emit('player-set-location', player,user, player.x, player.y, 0);
    }
}

exports.addUser = addUser;
exports.removeUser = removeUser;
exports.containsUser = containsUser;
exports.getUsers = getUsers;
exports.getPlayer = getPlayer;

exports.playerTurn = playerTurn;

exports.start = start;
exports.end = end;