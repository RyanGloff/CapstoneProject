var User = require('./user').User;

var users = [
    new User(1, "RyanUsername", "RyanPassword", "Gloff", "Ryan", "Ryan@email.com"),
    new User(2, "NickUsername", "NickPassword", "Kowalchyk", "Nick", "Nick@email.com"),
    new User(3, "AndrewUsername", "AndrewPassword", "Houde", "Andrew", "Andrew@email.com")
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

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.deleteAllUsers = deleteAllUsers;

exports.areValidCredentials = areValidCredentials;