const CONSTANTS = require('./gameConstants');
var MessageEmitter = require('./../messaging/messageEmitter');

var clock;
var time = 0;

var players = {};
var entities = [];

class Player {
    constructor(username) {
        this.playerNum = Object.keys(players).length % 4;
        this.x = CONSTANTS.StartingPositions[this.playerNum].x;
        this.y = CONSTANTS.StartingPositions[this.playerNum].y;
        this.color = CONSTANTS.StartingPositions[this.playerNum].color;
        this.direction = CONSTANTS.StartingPositions[this.playerNum].direction;
        this.user = username;
        this.wall = new Wall(this.x, this.y, this.user);
    }

    update(velocity) {
        this.x += this.direction.dx * velocity;
        this.y += this.direction.dy * velocity;
        this.wall.update(this.x, this.y);
    }

    turn(direction) {
        entities.push(this.wall);
        this.direction = direction;
        this.wall = new Wall(this.x, this.y, this.user);
    }
};

Wall = function(x, y, user) {
    this.start = [x, y];
    this.end = start;
    this.user = user;

    this.update = function(x, y) {
        this.end = [x, y];
    }
}

function addUser (username) {
    players[username] = new Player(username);
}

function removeUser (username) {
    delete players[username];
    if(entities.length != 0) {
        for(var i = entities.length; i >= 0; i--) {
            if(entities[i].user === username) {
                entities.splice(i, 1);
            }
        }
    }
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
    players[username].turn(direction);
}

function start (io) {
    if (clock !== undefined) return;
    time = 0;
    clock = setInterval(() => {
        time += 1;
        MessageEmitter.sendHeartBeat(io, time);
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
        MessageEmitter.sendPlayerMoved(io, player.user, player.x, player.y, player.direction.str);
    }
    if(Object.keys(players).length <= 1) {
        end();
    }
}

function collision (currentPlayer) {
    for(var user in players) {
        var player = players[user];
        if(currentPlayer.user != player.user) {
            if(currentPlayer.x < player.x + CONSTANTS.playerWidth &&
                currentPlayer.x + CONSTANTS.playerWidth > player.x &&
                currentPlayer.y < player.y + CONSTANTS.playerHeight &&
                currentPlayer.y + CONSTANTS.playerHeight > player.y) {
                    return true;
                }
            if(currentPlayer.x ) {
                
            }
        }
    }
    for(var entity in entities) {

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