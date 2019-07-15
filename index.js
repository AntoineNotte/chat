//https://socket.io/get-started/chat/

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const mongoose = require("mongoose");
const Message = require("./table/message");


mongoose.connect("mongodb+srv://Anakroone:BQ5K10wME0lZ6DPy@cluster0-6w1wl.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',socket => {
    console.log('Utilisateur connecté');

    Message.find().then(data => {
        socket.emit("allMessage",data)
    }).catch(err => {
        console.log(err)
    })

    socket.broadcast.emit('hi');
    socket.on('disconnect', function () {
        console.log('User disconnected');
    });
    socket.on('chat message', function (msg) {
        const newMessage = new Message({
            username:"test",
            message:msg,
            date:new Date(),
        })

        newMessage.save().then(data => {
            console.log("success")
        }).catch(err => {
            console.log("error")
        })

        io.emit('chat message',msg);
    });
})

http.listen(3000, function () {
    console.log('listening on *:3000');
});
