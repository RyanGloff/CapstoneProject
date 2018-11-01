var User = require('./../user').User;
var Game = require('./../game').Game;

var users = [
    new User(1, "RyanUsername", "RyanPassword", "Gloff", "Ryan", "Ryan@email.com"),
    new User(2, "NickUsername", "NickPassword", "Kowalchyk", "Nick", "Nick@email.com"),
    new User(3, "AndrewUsername", "AndrewPassword", "Houde", "Andrew", "Andrew@email.com"),
    new User(4, "RandomUsername", "RandomPassword", "Random", "Random", "Random@email.com")
];

var games = [
    new Game(1, new Date(), [1, 2, 3, 4], [1, 3, 2, 4], [100, 75, 80, 10]),
    new Game(2, new Date(), [1, 2, 3, 4], [4, 3, 2, 1], [10, 20, 30, 40])
];

function getUsers () {
    return users;
}

function getUserById (id) {
    for (let i = 0; i < users.length; i += 1) {
        if (users[i].id === id) {
            return users[i];
        }
    }
    return undefined;
}

function addUser (user) {
    for (let i = 0; i < users.length; i += 1) {
        if (user.id === users[i].id) {
            return {
                success: false,
                reason: 409
            };
        }
    }
    users.push(user);
    return {
        success: true,
        id: user.id
    };
}

function deleteUser (id) {
    for (let i = 0; i < users.length; i += 1) {
        if (id === users[i].id) {
            users.splice(i, 1);
            return {
                success: true
            };
        }
    }
    return {
        success: false,
        reason: 404
    };
}

function deleteAllUsers () {
    users = [];
    return {
        success: true
    };
}

function areValidCredentials (credentials) {
    for (let i = 0; i < users.length; i += 1) {
        if (users[i].username === credentials.username && users[i].password === credentials.password) {
            return true;
        }
    }
    return false;
}

function getGames () {
    return games;
}

function getGameById (id) {
    for (let i = 0; i < games.length; i += 1) {
        if (games[i].id === id) {
            return games[i];
        }
    }
    return undefined;
}

function addGame (game) {
    for (let i = 0; i < games.length; i += 1) {
        if (game.id === games[i].id) {
            return {
                success: false,
                reason: 409
            };
        }
    }
    games.push(game);
    return {
        success: true,
        id: game.id
    };
}

function deleteGame (id) {
    for (let i = 0; i < games.length; i += 1) {
        if (id === games[i].id) {
            games.splice(i, 1);
            return {
                success: true
            };
        }
    }
    return {
        success: false,
        reason: 404
    };
}

function deleteAllGames () {
    games = [];
    return {
        success: true
    };
}

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.deleteAllUsers = deleteAllUsers;

exports.areValidCredentials = areValidCredentials;

exports.getGames = getGames;
exports.getGameById = getGameById;
exports.addGame = addGame;
exports.deleteGame = deleteGame;
exports.deleteAllGames = deleteAllGames;