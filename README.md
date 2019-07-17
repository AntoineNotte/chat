
# Chat - Node JS

# Lien des consignes
[Consignes](https://github.com/becodeorg/CRL-Turing-3.11/tree/master/Parcours/05-Nodejs/3.Chat)

## Introduction

<p>Réalisation d'un chat type messenger/discord à partir de NodeJS, JavaScript, HTML et CSS.</p>

---

# Les langages et outils utilisés 
* HTML 5
* CSS3
* JavaScript
* Markdown
* Git
* BootStrap

---

# Personnes ayant travaillé sur le projet

* [Antoine Notte](https://github.com/AntoineNotte)
* [Christophe Dejaiffe](https://github.com/christophedejaiffe)
* [Maxim Lopez](https://github.com/MaximLopez)

<p>Alors en formation chez BeCode.</p>

## Quand a t-il été réalisé ? 

Ce projet a été réalisé le 10 juillt 2019.

## Dans quel cadre ce projet a vu le jour ? 
Il s'agit d'un travail de groupe réalisé dans le cadre de la formation BeCode.

--- 

# Comment récupérer le projet
Il suffit de cloner le dépôt ou de télécharger le zip de ce dernier.



## Présentation du code

<p>Dans cette partie, nous allons vous présenter le code qui a été réalisé pour le projet. </p>

### Partie HTML

<details>
<summary>Fichier HTML</summary>

```markdown

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Chat NodeJs</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" type="text/css"
        rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body style="background-color: gray">

    <div class="container">
        <h3 class=" text-center">Messaging</h3>
        <div class="messaging">
            <div class="scrollbar scrollbar-warning" style="width: 400px">
                <div class="force-overflow"></div>
                <div class="inbox_msg">
                    <div class="inbox_people">
                        <div class="type_msg">
                            <div class="input_msg_write">


                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="container-fluid" id="chat">
                    <ul id="messages"></ul>
                
                </div>
            </div>
            
            <div class="container-fluid" id="inputField">
                <nav class="navbar navbar-light bg-dark">
                    <form action="">
                        <input id="m" autocomplete="off" /><button class="btn btn-primary">Envoyer</button>
                    </form>
                    <button id="log">login</button>
                </nav>
            </div>
            </div>
            </div>
            <!--Script JS-->



            <script src="/socket.io/socket.io.js"></script>
            <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
            <script>
                let socket = io();
                let username = prompt('Pseudo');
                socket.emit('username', username);
                console.log(username)
                $(function () {
                    let socket = io();
                    $('form').submit(function (e) {
                        e.preventDefault(); // prevents page reloading
                        socket.emit('chat message',{
                            user:username,
                            message: $('#m').val(),
                            date:new Date()
                        });
                        $('#m').val('');
                        return false;
                    });
                });
                socket.on('chat message', function (data) {
                    console.log(data)
                    $('#messages').append($('<li>').text(`${new Date(data.date).toLocaleString("fr-FR",{
                        weekday:"long",
                        day:"numeric",
                        month:"long",
                        year:"numeric",
                        hour:"2-digit",
                        minute:"2-digit",
                        second:"2-digit"
                    })} \n${data.username}: ${data.message}`));
                });
                socket.on("allMessage", data => {
                    console.log('d,qiod as  ')
                    for (let i = 0; i < data.length; i++) {
                        let msg =
                            `${data[i].username} \n ${data[i].message} \n ${new Date(data[i].date).toLocaleString("fr-FR")}`
                        $('#messages').append($('<li>').text(msg));
                        console.log(data[i])
                    }
                })
            </script>
            <!-- The core Firebase JS SDK is always required and must be listed first -->
            <script src="/__/firebase/6.3.0/firebase-app.js"></script>

            <!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#reserved-urls -->
            <script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js"></script>
            <script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-auth.js"></script>
            <script src="assets/js/client.js"></script>

            <!-- Initialize Firebase -->
            <script src="/__/firebase/init.js"></script>
            <!--BootStrap-->
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossorigin="anonymous">
            </script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
                integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                crossorigin="anonymous">
            </script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                crossorigin="anonymous">
            </script>
</body>

</html>

```

</details>

### Partie CSS

<details>
<summary>Fichier CSS</summary>

```markdown

* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
}

body {
  background-color: gray;
}

.container {
  width: 500px;
  margin-top: 50px;
  margin-left: 33%;
  margin-right: 33%;
  border: 5px solid orange;
  border-radius: 30px;
  background-color: lightgray;
}

h3 {
  font-size: 2em;
  color: white;
  text-shadow: 2px 2px 5px black;
}

.text-center {
  border-bottom: 5px solid orange;
  padding: 10px;
}

.scrollbar {
  margin-left: 30px;
  float: left;
  height: 300px;
  width: 65px;
  background: #fff;
  overflow-y: scroll;
  margin-bottom: 25px;
}

.force-overflow {
  min-height: 5px;
}

.scrollbar-primary::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.scrollbar-primary::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #4285F4;
}

.scrollbar-danger::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5;
  border-radius: 10px;
}

.scrollbar-danger::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.scrollbar-danger::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #ff3547;
}

.scrollbar-warning::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5;
  border-radius: 10px;
}

.scrollbar-warning::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.scrollbar-warning::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #FF8800;
}

.scrollbar-success::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5;
  border-radius: 10px;
}

.scrollbar-success::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.scrollbar-success::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #00C851;
}

.scrollbar-info::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5;
  border-radius: 10px;
}

.scrollbar-info::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.scrollbar-info::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #33b5e5;
}

.scrollbar-default::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5;
  border-radius: 10px;
}

.scrollbar-default::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.scrollbar-default::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #2BBBAD;
}

.scrollbar-secondary::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #F5F5F5;
  border-radius: 10px;
}

.scrollbar-secondary::-webkit-scrollbar {
  width: 12px;
  background-color: #F5F5F5;
}

.scrollbar-secondary::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #aa66cc;
}



```

</details>

### Partie JS

<details>
<summary>Fichier index.js</summary>

```markdown


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


```

</details>

<details>
<summary>Fichier client.js</summary>

```markdown

let firebaseConfig = {
    apiKey: "AIzaSyC3WMGi771TnqQHlXYsL-plwXl0iNIi6D8",
    authDomain: "chat-nodejs-f520b.firebaseapp.com",
    databaseURL: "https://chat-nodejs-f520b.firebaseio.com",
    projectId: "chat-nodejs-f520b",
    storageBucket: "",
    messagingSenderId: "499294647461",
    appId: "1:499294647461:web:c4a9e471cb9e74fb"
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

}   
$('#log').on ('click', login);

```

</details>