function addEndpoints (app, restAuditer, dbConnector) {
    app.get('/users', async (req, res) => {
        console.log('GET\t/users\tResponse: 200');
        res.status(200).send(await dbConnector.getUsers());
    });
    app.get('/users/:id', async (req, res) => {
        let user = await dbConnector.getUserById(parseInt(req.params.id));
        if (user === undefined) {
            console.log('GET\t/users/' + req.params.id + '\tResponse: 404');
            res.sendStatus(404);
        } else {
            console.log('GET\t/users/' + req.params.id + '\tResponse: 200');
            res.status(200).send(user);
        }
    });
    app.post('/users', async (req, res) => {
        let auditRes = restAuditer.auditAddUser(req.body);
        let dbRes = await dbConnector.addUser(req.body);
        if (!auditRes) {
            console.log('POST\t/users\tResponse: ' + 400);
            res.status(400).send('Malformed payload');
            return;
        }
        console.log(dbRes);
        if (dbRes.success) {
            console.log('POST\t/users\tResponse: 200');
            res.status(200).send({id: dbRes.id});
        } else {
            console.log('POST\t/users\tResponse: ' + dbRes.reason);
            res.sendStatus(dbRes.reason);
        }
    });
    app.delete('/users', async (req, res) => {
        await dbConnector.deleteAllUsers();
        console.log('DELETE\t/users\tResponse: 200');
        res.sendStatus(200);

    });
    app.delete('/users/:id', async (req, res) => {
        await dbConnector.deleteUser(parseInt(req.params.id));
        console.log('DELETE\t/users/' + req.params.id + '\tResponse: 200');
        res.sendStatus(200);
    });
}

exports.addEndpoints = addEndpoints;