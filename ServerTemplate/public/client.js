// Connect to the server
var socket = io();

// Socket message handlers
socket.on('message-id-response', (data) => {
    console.log("Response", data);
    
    // Wait 1 sec then call sendMessage
    setTimeout(sendMessage, 1000);
});

function sendMessage () {
    socket.emit('message-id', {
        hello: "hello",
        world: "world"
    });
}

// Send initial message to start pinging server
sendMessage();
