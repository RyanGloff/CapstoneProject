function getTurnDirection (currentDir, turn) {
    let dirIndex = turnMap.indexOf(currentDir);
    if (turn === 'LEFT') {
        dirIndex++;
    } else if (turn === 'RIGHT') {
        dirIndex += turnMap.length - 1;
    }
    dirIndex %= turnMap.length;
    return turnMap[dirIndex];
}

function keyPressed (e) {
    let key = e.keyCode;
    let newDirection;
    switch (key) {
        case 65:
        case 37:
        console.log(sprites[username].direction);
            newDirection = getTurnDirection(sprites[username].direction, 'LEFT');
            MessageEmitter.sendPlayerTurned(socket, newDirection);
            break;
        case 68:
        case 39:
            newDirection = getTurnDirection(sprites[username].direction, 'RIGHT');
            MessageEmitter.sendPlayerTurned(socket, newDirection);
            break;
    }
}

document.addEventListener('keydown', keyPressed);