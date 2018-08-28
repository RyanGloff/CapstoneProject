// Server
const express = require('express');
const app = express();
const server = require('http').createServer(app);

// Sockets
const io = require('socket.io')(server);

// Setting the public directory
app.use(express.static('public'));

// Adding a GET request handler for localhost:5000
app.get('/', (req, res) => {
    // Sends back the index.html page in the public directory
    res.sendFile('index.html');
});

// Creating socket connections
io.on('connection', (socket) => {
    console.log('Connection created');

    // Example handler
    socket.on('message-id', (data) => {
        console.log("Message was received", data);
        // Sending back the data that was sent to the server from the client
        socket.emit('message-id-response', data);
    });

    // Socket message handlers
    socket.on('disconnect', (data) => {
        console.log('Disconnected');
    });
});

// Starts the server on port 5000
server.listen(5000);
