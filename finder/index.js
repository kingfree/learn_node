const fs = require('fs');

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
            i++;
            if (i == files.length) {
                console.log('');
                process.stdout.write('    \033[33m选择:   \033[39m');
                process.stdin.resume();
                process.stdin.setEncoding('utf8');
            } else {
                file(i);
            }
        });
    }

    file(0);
});
