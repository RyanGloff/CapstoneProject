var express = require('express');  
var app = express();  
var server = require('http').createServer(app);
var bodyParser = require('body-parser');

const dbConnector = require('./dbConnector.js');

app.use(bodyParser.json());

// /Users
// GET operations
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

// POST operations
app.post('/users', (req, res) => {
    let dbRes = dbConnector.addUser(req.body);
    if (dbRes.success) {
        console.log('POST\t/users\tResponse: 200');
        res.status(200).send({id: dbRes.id});
    } else {
        console.log('POST\t/users\tResponse: ' + dbRes.reason);
        res.sendStatus(dbRes.reason);
    }
});

// DELETE operations
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

// /login
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

server.listen(8081);