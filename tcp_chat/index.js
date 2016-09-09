var net = require('net');

var count = 0;

var server = net.createServer(function (conn) {
    conn.write('\n > 欢迎使用      \033[92mNode Chat\033[39m!' +
        '\n > 当前在线用户: ' + count + ' 人  ' +
        '\n > 输入你的昵称:      ');
    count++;
    conn.on('close', function () {
        count--;
    });
});

server.listen(3000, function () {
    console.log('\033[96m    服务监听在: *:3000\033[39m');
});
