var net = require('net');

var server = net.createServer(function (conn) {
   console.log('\033[90m    连接建立\033[39m');
});

server.listen(3000, function () {
   console.log('\033[96m    服务监听在: *:3000\033[39m');
});
