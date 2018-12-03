// Timing
socket.on('heartbeat', (data) => {
    game.setTime(data.time);
});
socket.on('game-start', (data) => {
    game.start(data.heartbeatValue);
});
socket.on('game-end', (data) => {
    game.end(data.heartbeatValue);
});