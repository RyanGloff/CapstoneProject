function auditAddUser (user) {
    return user.id !== undefined &&
        user.username !== undefined &&
        user.password !== undefined &&
        user.firstName !== undefined &&
        user.lastName !== undefined &&
        user.email !== undefined;
}

function auditAddGame (game) {
    return game.id !== undefined &&
        game.startTime !== undefined &&
        game.users !== undefined &&
        game.results !== undefined &&
        game.timeLasted !== undefined;
}

exports.auditAddUser = auditAddUser;
exports.auditAddGame = auditAddGame;