var RestClient = require('./../rest/restClient');

async function validateUser (username, password) {
    var response = await RestClient.post('localhost', 8081, '/login', {
        username: username,
        password: password
    })
    .catch (err => {
        console.log('Invalid POST to /login', err);
    });
    return response === 'OK';
}

async function registerUser (id, username, password, firstName, lastName, email) {
    var response = await RestClient.post('localhost', 8081, '/users', {
        id: id,
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email
    })
    .catch (err => {
        console.log('Invalid POST to /users', err);
    });
    console.log(response);
    return response.id !== undefined;
}

exports.validateUser = validateUser;
exports.registerUser = registerUser;