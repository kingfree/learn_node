var net = require('net');

var count = 0;
var users = {};

var server = net.createServer(function (conn) {
    var nickname, i;

    conn.setEncoding('utf8');

    conn.write('\n > 欢迎使用    \033[92mNode Chat\033[39m!' +
        '\n > 当前在线用户: ' + count + ' 人  ' +
        '\n > 输入你的昵称:    ');

    count++;

    conn.on('data', function (data) {
        data = data.replace('\r\n', '');
        if (!nickname) {
            if (users[data]) {
                conn.write('\033[93m 昵称已存在，换个别的吧:    \033[39m');
            } else {
                nickname = data;
                users[nickname] = conn;
                for (i in users) {
                    users[i].write('\033[90m > ' + nickname + ' 上线了！   \033[39m\n');
                }
            }
        } else {
            for (i in users) {
                if (i != nickname) {
                    users[i].write('\033[96m > ' + nickname + ': \033[39m' + data + '\n');
                }
            }
        }
    });

    conn.on('close', function () {
        count--;
        delete users[nickname];
    });
});

server.listen(3000, function () {
    console.log('\033[96m    服务监听在: *:3000\033[39m');
});
