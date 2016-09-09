var http = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.write('<h1>Hello Node.js</h1>');
    setTimeout(function () {
        res.end('<pre>' + JSON.stringify(req.headers, null, 2) + '</pre>');
    }, 500);
});
server.listen(8080);
