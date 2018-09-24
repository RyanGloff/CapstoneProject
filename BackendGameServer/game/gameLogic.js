const users = [];
var clock;
var time = 0;
var THREE = require('three');

var players = {};

class Player {
    constructor() {
        this.sprite;
        this.dir = -1;
        this.up = false;
    }

    update(velocity) {
        if(this.up) {
            this.sprite.position.y += (this.dir * velocity);
        }
        else {
            this.sprite.position.x += (this.dir * velocity);
        }
    }

    changeDir(direction) {
        if((direction === "right" && !this.up) || (direction === "left" && this.up)) {
            this.dir *= -1;
        }
        this.up = !this.up;
        console.log("Turning: " + direction);
    }

    get Sprite() {
        return this.sprite;
    }
}; 

function addUser (username) {
    users.push(username);
    players.username = new Player();
}

function removeUser (username) {
    for (let i = 0; i < users.length; i += 1) {
        if (users[i] === username) {
            users.splice(i, 1);
            return;
        }
    }
}

function containsUser (username) {
    for (let i = 0; i < users.length; i += 1) {
        if (users[i] === username) {
            return true;
        }
    }
    return false;
}

function getUsers () {
    return users;
}

function playerTurnLeft (username) {
    console.log(username, 'turned left');
    players[username].changeDir("Left");
}
function playerTurnRight (username) {
    console.log(username, 'turned right');
    players[username].changeDir("Right");
}

function start (io) {
    if (clock !== undefined) return;
    time = 0;
    clock = setInterval(() => {
        time += 1;
        io.emit('heartbeat', {
            time: time
        });
    }, 1000);
    update();
}

function end () {
    clearInterval(clock);
    clock = undefined;
}

function update () {
        var velocity = 1;
        for(var i = 0; i < players.length; i++) {
            players[i].update(velocity);
        }
        //players["test"].update(velocity);
}

exports.addUser = addUser;
exports.removeUser = removeUser;
exports.containsUser = containsUser;
exports.getUsers = getUsers;

exports.playerTurnLeft = playerTurnLeft;
exports.playerTurnRight = playerTurnRight;

exports.start = start;
exports.end = end;
exports.players = players;
exports.Player = Player;