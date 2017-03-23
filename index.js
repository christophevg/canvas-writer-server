var app  = require('express')();
var http = require('http').Server(app);
var io   = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/canvas-writer.js', function(req, res){
  res.sendFile(__dirname + '/canvas-writer.js');
});

io.on('connection', function(socket){
  socket.on('message', function(msg){
    socket.broadcast.emit('message', msg);
  });
});

var port = process.env.PORT || 3000;

http.listen(port, function() {
  console.log('listening on *:' + port);
});
