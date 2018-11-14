// Player Logic
socket.on('player-turned', (data) => {
    game.playerTurn(data.user, data.location, data.direction);
});
socket.on('player-crashed', (data) => {
    game.playerCrashed(data.user, data.location);
});
socket.on('player-set-location', (data) => {
    game.setPlayerLocation(data.user, data.x, data.y, data.direction, data.color);
});
socket.on('player-set-color', (data) => {
    game.setPlayerColor(data.user, data.color);
});