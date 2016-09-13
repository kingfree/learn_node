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

var positions = {};
var total = 0;
var clients = [];

server.on('connection', function (socket) {
  socket.id = ++total;
  socket.send(JSON.stringify(positions));
  clients[socket.id] = socket;

  socket.on('message', function (msg) {
    console.log(msg);
    if (msg == 'ping') {
      socket.send('pong');
    } else {
      try {
        positions[socket.id] = JSON.parse(msg);
        broadcast(JSON.stringify({
          type: 'position',
          pos: positions[socket.id],
          id: socket.id
        }));
      } catch (e) {
        console.error(e);
      }
    }
  });

  socket.on('close', function () {
    broadcast(JSON.stringify({
      type: 'disconnect',
      id: socket.id
    }));
    delete positions[socket.id];
    delete clients[socket.id];
  });

  function broadcast(msg) {
    for (var id in clients) {
      var client = clients[id];
      if (client && client.id != socket.id) {
        client.send(msg);
      }
    }
  }
});
