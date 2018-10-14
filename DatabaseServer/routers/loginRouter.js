function addEndpoints (app, restAuditer, dbConnector) {
    app.post('/login', (req, res) => {
        let dbRes = dbConnector.areValidCredentials(req.body);
        if (dbRes) {
            console.log('POST\t/login\tResponse: 200');
            res.sendStatus(200);
        } else {
            console.log('POST\t/login\tResponse: 401');
            res.sendStatus(401);
        }
    });
}

exports.addEndpoints = addEndpoints;