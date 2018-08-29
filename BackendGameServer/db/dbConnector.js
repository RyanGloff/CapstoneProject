
// TODO: The only thing that should stay in this file is the validateUser function.
//       Remove the contents of that function and replace it with a call to the 
//       db microservice.

const validUsers = [
    {
        username: 'ryan',
        password: 'pass'
    },
    {
        username: 'test',
        password: 'testpass'
    },
    {
        username: 'test2',
        password: 'test2pass'
    }
];

function validateUser (username, password) {
    // TODO: Change this to a REST call to the db microservice
    for (let i = 0; i < validUsers.length; i++) {
        if (validUsers[i].username === username && validUsers[i].password === password) return true;
    }
    return false;
}

exports.validateUser = validateUser;