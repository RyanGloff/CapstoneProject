const RestAuditer = require('./../restAuditer');

function addEndpoints (app, restAuditer, dbConnector) {
    app.get('/games', async (req, res) => {
        let games = await dbConnector.getGames();
        res.status(200).send(games);
    });
    app.get('/games/:id', async (req, res) => {
        let game = await dbConnector.getGameById(parseInt(req.params.id));
        if (game === undefined) {
            console.log('GET\t/games/' + req.params.id + '\tResponse: 404');
            res.sendStatus(404);
        } else {
            console.log('GET\t/games/' + req.params.id + '\tResponse: 200');
            res.status(200).send(game);
        }
    });
    app.post('/games', async (req, res) => {
        let auditRes = restAuditer.auditAddGame(req.body);
        let dbRes = await dbConnector.addGame(req.body);
        if (dbRes.success && auditRes) {
            console.log('POST\t/games\tResponse: 200');
            res.status(200).send({id: dbRes.id});
        } else if (!auditRes) {
            console.log('POST\t/games\tResponse: ' + 400);
            res.status(400).send('Malformed payload');
        } else {
            console.log('POST\t/games\tResponse: ' + dbRes.reason);
            res.sendStatus(dbRes.reason);
        }
    });
    app.delete('/games', async (req, res) => {
        let dbRes = await dbConnector.deleteAllGames();
        if (dbRes.success) {
            console.log('DELETE\t/games\tResponse: 200');
            res.sendStatus(200);
        } else {
            console.log('DELETE\t/games\tResponse: 500');
            res.sendStatus(500);
        }
    });
    app.delete('/games/:id', async (req, res) => {
        let dbRes = await dbConnector.deleteGame(parseInt(req.params.id));
        if (dbRes.success) {
            console.log('DELETE\t/games/' + req.params.id + '\tResponse: 200');
            res.sendStatus(200);
        } else {
            console.log('DELETE\t/games/' + req.params.id + '\tResponse: ' + dbRes.reason);
            res.sendStatus(dbRes.reason);
        }
    });
}

exports.addEndpoints = addEndpoints;