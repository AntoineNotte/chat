
let express = require('express');
const app = express(); // Static
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let firebase = require('firebase');

app.use("/assets", express.static("assets")); // Static

const mongoose = require("mongoose");
const Message = require("./table/message");

mongoose.connect("mongodb+srv://Anakroone:BQ5K10wME0lZ6DPy@cluster0-6w1wl.mongodb.net/test?retryWrites=true&w=majority",{
    useNewUrlParser:true
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',socket => {
    socket.on('username', function(username) {
        console.log(username + ' connecté');
        Message.find().sort({date: -1}).limit(10).then(data => {
            console.log(data)
            socket.emit("allMessage",data.reverse())
        }).catch(err => {
            console.log(err)
        })
    })
    socket.broadcast.emit('hi');
    socket.on('disconnect', function (username) {
        console.log(username + ' déconnecté');
    });
    socket.on('chat message', function (msg) {
        const newMessage = new Message({
            username:msg.user,
            message:msg.message,
            date:msg.date
        })

        newMessage.save().then(data => {
            io.emit('chat message',data);
            console.log("Succès")
        }).catch(err => {
            console.log(err)
        })

        
    });
})

http.listen(4000, function () {
    /*
    let firebaseConfig = {
    apiKey: "AIzaSyAYwh1xpl-z3PwqufvBJt_sqwcf30O3MJk",
    authDomain: "mongochat-f3306.firebaseapp.com",
    databaseURL: "https://mongochat-f3306.firebaseio.com",
    projectId: "mongochat-f3306",
    storageBucket: "",
    messagingSenderId: "673903107835",
    appId: "1:673903107835:web:952b573ac4ee9604"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    function login() {
        let provider = new firebase.auth.GithubAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            let token = result.credential.accessToken;
            let user = result.user;

        console.log(user);
        }).catch(function(error) {
            let errorMessage = error.message;
            console.log(errorMessage);

        });
        console.log("listening")
    }   
    */
    console.log("listening")
/*$('#log').on ('click', login);console.log('Ecoute le port *:5000');*/
})
