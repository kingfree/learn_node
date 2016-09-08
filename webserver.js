var http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>Hello Node.js</h1>');
});
server.listen(8080);
