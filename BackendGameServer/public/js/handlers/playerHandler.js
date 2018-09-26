// Player Logic
socket.on('player-turn-left', (data) => {
    game.playerTurnLeft(data.user, data.location);
});
socket.on('player-turn-right', (data) => {
    game.playerTurnRight(data.user, data.location);
});
socket.on('player-crashed', (data) => {
    game.playerCrashed(data.user, data.location);
});
socket.on('player-set-location', (data) => {
    game.setPlayerLocation(data.user, data.x, data.y, data.direction);
});
socket.on('player-set-color', (data) => {
    game.setPlayerColor(data.user, data.color);
});