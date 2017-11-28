var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('connect-user', function(data) {
  	console.log(data.username + ' connected');
  	io.emit('connect-user', data);
  });

  socket.on('disconnect', function() {
  	console.log('user disconnected');
  });

  socket.on('new-message', function(data) {
  	io.emit('new-message', data);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});