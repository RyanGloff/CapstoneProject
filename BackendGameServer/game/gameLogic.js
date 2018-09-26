const users = [];
var clock;
var time = 0;

var players = {};

class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.dir = -1;
        this.up = false;
    }

    update(velocity) {
        if(this.up) {
            this.y += (this.dir * velocity);
        }
        else {
            this.x += (this.dir * velocity);
        }
    }

    changeDir(direction) {
        if((direction === "right" && !this.up) || (direction === "left" && this.up)) {
            this.dir *= -1;
        }
        this.up = !this.up;
        console.log("Turning: " + direction);
    }
}; 

function addUser (username) {
    users.push(username);
    players.username = new Player();
    console.log("Adding user");
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
    players.test = new Player();
    time = 0;
    clock = setInterval(() => {
        time += 1;
        io.emit('heartbeat', {
            time: time
        });
        update();
    }, 1000);
}

function end () {
    clearInterval(clock);
    clock = undefined;
}

function update () {
        var velocity = 1;
        for(var i = 0; i < players.length; i++) {
            players[i].update(velocity);
            io.emit('player-set-location', players[i].x, 0);
        }
        console.log("updating");
}

exports.addUser = addUser;
exports.removeUser = removeUser;
exports.containsUser = containsUser;
exports.getUsers = getUsers;

exports.playerTurnLeft = playerTurnLeft;
exports.playerTurnRight = playerTurnRight;

exports.start = start;
exports.end = end;