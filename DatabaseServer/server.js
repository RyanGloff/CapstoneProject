var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var bodyParser = require('body-parser');

var commander = require('commander');

commander
  .option('-c, --connector [type]', 'Add the type of db implementation', 'MemoryBasedDB')
  .parse(process.argv);

console.log('Using', commander.connector, 'db implementation');
const dbConnector = require('./dbImpls/' + commander.connector);
const restAuditer = require('./restAuditer.js');
const usersRouter = require('./routers/usersRouter');
const gamesRouter = require('./routers/gamesRouter');
const loginRouter = require('./routers/loginRouter');

app.use(bodyParser.json());

<<<<<<< HEAD
// /Users
// GET operations
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

// POST operations
app.post('/users', async (req, res) => {
    let auditRes = restAuditer.auditAddUser(req.body);
    let dbRes = await dbConnector.addUser(req.body);
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

// DELETE operations
app.delete('/users', (req, res) => {
    let dbRes = dbConnector.deleteAllUsers();
    console.log('DELETE\t/users\tResponse: 200');
    res.sendStatus(200);
});
app.delete('/users/:id', (req, res) => {
    let dbRes = dbConnector.deleteUser(parseInt(req.params.id));
	console.log('DELETE\t/users/' + req.params.id + '\tResponse: 200');
	res.sendStatus(200);
});

// /login
app.post('/login', async function(req, res) {
    let dbRes = await dbConnector.areValidCredentials(req.body);
	console.log(dbRes)
    if (dbRes) {
        console.log('POST\t/login\tResponse: 200');
        res.sendStatus(200);
    } else {
        console.log('POST\t/login\tResponse: 401');
        res.sendStatus(401);
    }
});
=======
usersRouter.addEndpoints(app, restAuditer, dbConnector);
gamesRouter.addEndpoints(app, restAuditer, dbConnector);
loginRouter.addEndpoints(app, restAuditer, dbConnector);
>>>>>>> e3608f618d516e35b2a26613db6e42ff32794c2b

server.listen(8081);