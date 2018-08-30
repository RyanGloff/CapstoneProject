const timeView = document.getElementById('time-view');

function Game () {
    this.playerTurnLeft = function (username, location) {
        console.log('player-turn-left', username, location);
    };
    this.playerTurnRight = function (username, location) {
        console.log('player-turn-right', username, location);
    };
    this.playerCrashed = function (username, location) {
        console.log('player-crashed', username, location);
    };
    this.setPlayerLocation = function (username, location) {
        console.log('set-player-location', username, location);
    };
    this.setPlayerColor = function (username, color) {
        console.log('set-player-color', username, color);
    };
    this.setTime = function (time) {
        timeView.innerHTML = 'time: ' + time;
        console.log('time', time);
    };
    this.start = function (time) {
        console.log('start the game', time);
    };
    this.end = function (time) {
        console.log('end the game', time);
    };
    this.addPlayer = function (name, location, color, direction) {
        console.log('add-player', name, location, color, direction);
    };
    this.removePlayer = function (name) {
        console.log('remove-player', name, location, color, direction);
    };
}

var game = new Game();