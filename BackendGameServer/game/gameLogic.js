const users = [];
var clock;
var time = 0;

var players = {};

class Player {
    constructor(username) {
        this.x = 0;
        this.y = 0;
        this.direction = 1;
        this.up = false;
        this.user = username;
    }

    update(velocity) {
        if(this.up) {
            this.y += (this.direction * velocity);
        }
        else {
            this.x += (this.direction * velocity);
        }
    }

    changeDir(direction) {
        if((direction === "right" && !this.up) || (direction === "left" && this.up)) {
            this.direction *= -1;
        }
        this.up = !this.up;
        console.log("Turning: " + direction);
    }
}; 

function addUser (username) {
    users.push(username);
    players[username] = new Player(username);
}

function removeUser (username) {
    delete players[username];
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
    players[username].changeDir("left");
}
function playerTurnRight (username) {
    console.log(username, 'turned right');
    players[username].changeDir("right");
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
    }, 1000);
}

function end () {
    clearInterval(clock);
    clock = undefined;
}

function update (io) {
        var velocity = 1;
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

exports.playerTurnLeft = playerTurnLeft;
exports.playerTurnRight = playerTurnRight;

exports.start = start;
exports.end = end;