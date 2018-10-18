function keyPressed (e) {
    let key = e.keyCode;
    switch (key) {
        case 87:
        case 38:
            MessageEmitter.sendPlayerTurned(socket, 'UP');
            break;
        case 65:
        case 37:
            MessageEmitter.sendPlayerTurned(socket, 'LEFT');
            break;
        case 83:
        case 40:
            MessageEmitter.sendPlayerTurned(socket, 'DOWN');
            break;
        case 68:
        case 39:
            MessageEmitter.sendPlayerTurned(socket, 'RIGHT');
            break;
    }
}

document.addEventListener('keydown', keyPressed);