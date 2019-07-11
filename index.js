//https://socket.io/get-started/chat/

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) { // gere les connections
    console.log('User connected');
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
});

io.on('connection', function (socket) { // affiche les messages dans la console
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
    });
});

io.emit('some event', {
    for: 'everyone'
});
io.on('connection', function (socket) {
    socket.broadcast.emit('hi');
});
io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});