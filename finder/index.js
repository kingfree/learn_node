const fs = require('fs');
var stdin = process.stdin;
var stdout = process.stdout;

fs.readdir(process.cwd(), function (err, files) {
    if (!files.length) {
        return console.log('    \033[31m 当前目录下没有文件\033[39m');
    }
    console.log('选择文件或目录:');
    var stats = [];

    function file(i) {
        var filename = files[i];
        var path = __dirname + '/' + filename;
        fs.stat(path, function (err, stat) {
            stats[i] = stat;
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
        var filename = files[choice];
        if (filename) {
            var path = __dirname + '/' + filename;
            stdin.pause();
            if (stats[choice].isDirectory()) {
                fs.readdir(path, function (err, files) {
                    console.log('');
                    console.log('    (' + files.length + ' 个文件)');
                    files.forEach(function (file) {
                        console.log('     - ' + file);
                    });
                });
            } else {
                fs.readFile(path, 'utf8', function (err, data) {
                    console.log('');
                    console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m')
                });
            }
        } else {
            stdout.write('    \033[31m重试:    \033[39m');
        }
    }

    file(0);
});
