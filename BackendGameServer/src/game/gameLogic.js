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
        for(var i = entities.length - 1; i >= 0; i--) {
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
    let velocity = CONSTANTS.PLAYER_VELOCITY;
    for(let user in players) {
        let player = players[user];
        player.update(velocity);
        let isColliding = collision(player);
        if(isColliding) {
            removeUser(player.user);
        }
        MessageEmitter.sendPlayerMoved(io, player.user, player.x, player.y, player.direction.str);
    }
    if(Object.keys(players).length <= 1) {
        end();
    }
}

function collision (currentPlayer) {

    let playerLeft = currentPlayer.x - CONSTANTS.playerWidth / 2;
    let playerRight = currentPlayer.x + CONSTANTS.playerWidth / 2;
    let playerBottom = currentPlayer.y - CONSTANTS.playerHeight / 2;
    let playerTop = currentPlayer.y + CONSTANTS.playerHeight / 2;

    if((currentPlayer.x + CONSTANTS.playerWidth / 2) > (CONSTANTS.mapSize / 2) ||
    (currentPlayer.x + CONSTANTS.playerWidth / 2) < (-CONSTANTS.mapSize / 2) ||
    (currentPlayer.y + CONSTANTS.playerHeight / 2) > (CONSTANTS.mapSize / 2) ||
    (currentPlayer.y + CONSTANTS.playerHeight / 2) < (-CONSTANTS.mapSize / 2)) {
        return true;
    }
    for(let user in players) {
        let player = players[user];
        let subjectLeft = player.x - CONSTANTS.playerWidth / 2;
        let subjectRight = player.x + CONSTANTS.playerWidth / 2;
        let subjectBottom = player.y - CONSTANTS.playerHeight / 2;
        let subjectTop = player.y + CONSTANTS.playerHeight / 2;

        if(currentPlayer.user != player.user) {
            if(playerLeft < subjectRight && 
                playerRight > subjectLeft && 
                playerBottom < subjectTop && 
                playerTop > subjectBottom) {
                return true;
            }
            if(playerLeft < player.wall.end[0] &&
                playerRight > player.wall.start[0] &&
                playerTop < player.wall.end[1] &&
                playerBottom > player.wall.start[1]) {
                    return true;
                }
        }
    }
    for(var i = 0; i < entities.length; i++) {
        if(playerLeft < entities[i].end[0] &&
            playerRight > entities[i].start[0] &&
            playerTop < entities[i].end[1] &&
            playerBottom > entities[i].start[1]) {
                return true;
            }
    }
    return false;
}

exports.addUser = addUser;
exports.removeUser = removeUser;
exports.containsUser = containsUser;
exports.getUsers = getUsers;
exports.getPlayer = getPlayer;

exports.playerTurn = playerTurn;

exports.start = start;
exports.end = end;