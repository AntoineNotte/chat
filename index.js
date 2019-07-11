const app = require('express')(); 
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get ('/', function(req, res){ 
  
    res.sendFile('index.html', { root : './'});
  });

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg);
    });
  });

http.listen(3000, function(){console.log('listening on *: 3000');});
  

