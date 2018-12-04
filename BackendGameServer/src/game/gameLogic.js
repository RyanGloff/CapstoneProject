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
        this.wall = new Wall(this.x, this.y, this.direction.dx, this.direction.dy, this.user);
    }

    update(velocity) {
        this.x += this.direction.dx * velocity;
        this.y += this.direction.dy * velocity;
        this.wall.update(this.x, this.y, this.direction.dx, this.direction.dy);
    }

    turn(direction) {
        entities.push(this.wall);
        this.direction = direction;
        this.wall = new Wall(this.x, this.y, this.direction.dx, this.direction.dy, this.user);
    }
};

Wall = function(x, y, dx, dy, user) {
    this.start = [x + (-dx * (3/4) * CONSTANTS.playerHeight), y + (-dy * (3/4) * CONSTANTS.playerHeight)];
    this.end = start;
    this.user = user;

    this.update = function(x, y, dx, dy) {
        this.end = [x + (-dx * (3/4) * CONSTANTS.playerHeight), y + (-dy * (3/4) * CONSTANTS.playerHeight)];
    }
}

function addUser (username) {
    players[username] = new Player(username);
}

function removeUser (username) {
    if(username in players) {
        delete players[username].wall;
        delete players[username];
    }
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
        if(collision(player)) {
            removeUser(player.user);
            MessageEmitter.sendUserDisconnected(io, player.user);
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
        console.log("off map");
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
            if(playerLineCollision(playerLeft, playerTop, playerRight, playerBottom, player.wall.start[0], player.wall.start[1], player.wall.end[0], player.wall.end[1])) {
                return true;
            }
        }
    }
    for(let i = 0; i < entities.length; i++) {
        if(playerLineCollision(playerLeft, playerBottom, playerRight, playerTop, entities[i].start[0], entities[i].start[1], entities[i].end[0], entities[i].end[1])) {
            return true;
        }
        //if(boxCollision(playerLeft, playerBottom, playerRight, playerTop, entities[i].start[0] + 0.5, entities[i].start[1] + 0.5, entities[i].end[0] + 0.5, entities[i].end[1] + 0.5)) {
        //   return true;
        //}
    }
    return false;
}

function boxCollision(x1, y1, x2, y2, x3, y3, x4, y4) {
    if(x1 < x4 &&
        x2 > x3 &&
        y1 < y4 &&
        y2 > y3 ) {
            return true;
        }
}

//function from www.jeffreythompson.org
function lineCollision(x1, y1, x2, y2, x3, y3, x4, y4) {
    let uA = ((x4-x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
            ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    let uB = ((x2-x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
            ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    if(uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        return true
    }

    return false;
}

function playerLineCollision(playerLeft, playerTop, playerRight, playerBottom, x3, y3, x4, y4) {
    if(lineCollision(playerLeft, playerTop, playerRight, playerTop, x3, y3, x4, y4) || lineCollision(playerLeft, playerBottom, playerRight, playerBottom) ||
        lineCollision(playerLeft, playerTop, playerLeft, playerBottom) || (lineCollision(playerRight, playerTop, playerRight, playerBottom))) {
            return true;
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