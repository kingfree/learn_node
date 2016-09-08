const fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;

fs.readdir(process.cwd(), function (err, files) {
    if (!files.length) {
        return console.log('    \033[31m 当前目录下没有文件\033[39m');
    }
    console.log('选择文件或目录:');

    function file(i) {
        var filename = files[i];
        fs.stat(__dirname + '/' + filename, function (err, stat) {
            if (stat.isDirectory()) {
                console.log('    ' + i + '    \033[36m' + filename + '/\033[39m');
            } else {
                console.log('    ' + i + '    \033[90m' + filename + '\033[39m');
            }
            if (++i == files.length) {
                read();
            } else {
                file(i);
            }
        });
    }

    function read() {
        console.log('');
        stdout.write('    \033[33m选择:    \033[39m');
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data', option);
    }

    function option(data) {
        var choice = Number(data);
        if (files[choice]) {
            stdin.pause();
        } else {
            stdout.write('    \033[31m重试:    \033[39m');
        }
    }
    
    file(0);
});
