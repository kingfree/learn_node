var express = require('express');
var path = require('path');
var ws = require('websocket.io');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
app.use('/', routes);
app.listen(3000);

var server = ws.listen(3001);

server.on('connection', function (socket) {
  socket.on('message', function (msg) {
    console.log(msg);
    socket.send('pong');
  });
});
