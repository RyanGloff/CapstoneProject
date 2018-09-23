var RestClient = require('./../rest/restClient');

async function validateUser (username, password) {
    var response = await RestClient.post('localhost', 8081, '/login', {
        username: username,
        password: password
    })
    .catch (err => {});
    console.log(response === 'OK');
    return response === 'OK';
}

exports.validateUser = validateUser;