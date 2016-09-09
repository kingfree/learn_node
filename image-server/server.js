var http = require('http');
var fs = require('fs');
const ROOT_DIR = __dirname + '/www';

var server = http.createServer(function (req, res) {

    function serve(path, type) {
        res.writeHead(200, {
            'Content-Type': type
        });
        // fs.createReadStream(path).pipe(res);
        fs.createReadStream(path)
            .on('data', function (data) {
                res.write(data);
            })
            .on('end', function () {
                res.end();
            });
    }

    if (req.method == 'GET' && req.url.substr(0, 7) == '/images' && req.url.substr(-4) == '.jpg') {
        fs.stat(ROOT_DIR + req.url, function (err, stat) {
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end('File Not Found');
            } else {
                serve(ROOT_DIR + req.url, 'application/jpeg');
            }
        });
    } else if (req.method == 'GET' && req.url == '/') {
        serve(ROOT_DIR + '/index.html', 'text/html');
    } else {
        res.writeHead(404);
        res.end('404 Not Found');
    }

});

server.listen(3000);
