function addEndpoints (app, restAuditer, dbConnector) {
    app.get('/users', (req, res) => {
        console.log('GET\t/users\tResponse: 200');
        res.status(200).send(dbConnector.getUsers());
    });
    app.get('/users/:id', (req, res) => {
        let user = dbConnector.getUserById(parseInt(req.params.id));
        if (user === undefined) {
            console.log('GET\t/users/' + req.params.id + '\tResponse: 404');
            res.sendStatus(404);
        } else {
            console.log('GET\t/users/' + req.params.id + '\tResponse: 200');
            res.status(200).send(user);
        }
    });
    app.post('/users', (req, res) => {
        let auditRes = restAuditer.auditAddUser(req.body);
        let dbRes = dbConnector.addUser(req.body);
        if (dbRes.success && auditRes) {
            console.log('POST\t/users\tResponse: 200');
            res.status(200).send({id: dbRes.id});
        } else if (!auditRes) {
            console.log('POST\t/users\tResponse: ' + 400);
            res.status(400).send('Malformed payload');
        } else {
            console.log('POST\t/users\tResponse: ' + dbRes.reason);
            res.sendStatus(dbRes.reason);
        }
    });
    app.delete('/users', (req, res) => {
        let dbRes = dbConnector.deleteAllUsers();
        if (dbRes.success) {
            console.log('DELETE\t/users\tResponse: 200');
            res.sendStatus(200);
        } else {
            console.log('DELETE\t/users\tResponse: 500');
            res.sendStatus(500);
        }
    });
    app.delete('/users/:id', (req, res) => {
        let dbRes = dbConnector.deleteUser(parseInt(req.params.id));
        if (dbRes.success) {
            console.log('DELETE\t/users/' + req.params.id + '\tResponse: 200');
            res.sendStatus(200);
        } else {
            console.log('DELETE\t/users/' + req.params.id + '\tResponse: ' + dbRes.reason);
            res.sendStatus(dbRes.reason);
        }
    });
}

exports.addEndpoints = addEndpoints;