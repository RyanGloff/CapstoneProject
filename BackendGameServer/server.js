var express = require('express');  
var app = express();  
var server = require('http').createServer(app);

var io = require('socket.io')(server);
var connectionHandler = require('./messaging/connectionHandler');

app.use(express.static('public'));  
app.get('/', function(req, res) {  
    res.sendFile('index.html');
});

io.on('connection', (socket) => {
    connectionHandler.addConnection(socket, io);
});

server.listen(4200); 