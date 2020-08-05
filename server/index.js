const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));


app.get('/', function(req, res) {
    res.status(200).send("<h1> Hola mundo </h1>");
});

var date = new Date();
var days = date.toLocaleDateString();
var time = date.toLocaleTimeString();
var messages = [{

    id: 1,
    text: 'Chat Privado Socket.io',
    nickname: 'Bot',
    date: days,
    time: time

}];

io.on('connection', function(socket) {
    console.log("IP " + socket.handshake.address + " has connected");
    socket.emit('messages', messages);
    socket.on("addMessage", function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(6677, function() {
    console.log("Server functioning in localhost:6677");

});