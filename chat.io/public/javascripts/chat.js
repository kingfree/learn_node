window.onload = function () {
  var socket = io.connect();

  socket.on('connect', function () {
    socket.emit('join', prompt('输入昵称:'));
    document.getElementById('chat').style.display = 'block';
  });

  socket.on('announcement', function (msg) {
    var li = document.createElement('li');
    li.className = 'announcement';
    li.innerHTML = msg;
    document.getElementById('messages').appendChild(li);
  });

  function addMsg(from, text) {
    var li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = '<b>' + from + '</b>: ' + text;
    document.getElementById('messages').appendChild(li);

    return li;
  }

  var input = document.getElementById('text');
  document.getElementById('form').onsubmit = function () {
    var li = addMsg('我', input.value);

    socket.emit('text', input.value, function (date) {
      li.className = 'confirmed';
      li.title = date;
    });

    input.value = '';
    input.focus();

    return false;
  };

  socket.on('text', addMsg);
};
