var connect = require('connect');
var http = require('http');
var fs = require('fs');
var time = require('./request-time');

const ROOT_DIR = __dirname + '/www';

var app = connect();

function serve(res, path, type) {
    res.writeHead(200, {
        'Content-Type': type
    });
    fs.createReadStream(path).pipe(res);
}

app.use(time({time: 500}));

app.use(function (req, res, next) {
    if (req.method == 'GET' && req.url.substr(0, 7) == '/images' && req.url.substr(-4) == '.jpg') {
        fs.stat(ROOT_DIR + req.url, function (err, stat) {
            if (err || !stat.isFile()) {
                res.writeHead(404);
                res.end('File Not Found');
            } else {
                serve(res, ROOT_DIR + req.url, 'application/jpeg');
            }
        });
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    if (req.method == 'GET' && req.url == '/') {
        serve(res, ROOT_DIR + '/index.html', 'text/html');
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    if (req.method == 'GET' && req.url == '/wait') {
        setTimeout(function () {
            res.writeHead(200);
            res.end('Wait...');
        }, 1000);
    } else {
        next();
    }
});

app.use(function (req, res, next) {
    res.writeHead(404);
    res.end('404 Not Found');
    next();
});

http.createServer(app).listen(3000);
