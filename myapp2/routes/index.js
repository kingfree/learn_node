var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/about', function (req, res) {
    res.send('About');
});

router.get('/ab?cd', function (req, res) {
    // acd abcd
    res.send(req.url + '/ab?cd');
});

router.get('/ab+cd', function (req, res) {
    // abcd abbcd abbbcd
    res.send(req.url + '/ab+cd');
});

router.get('/ab*cd', function (req, res) {
    res.send(req.url + '/ab*cd');
});

router.get('/ab(cd)?e', function (req, res) {
    // abe abcde
    res.send(req.url + '/ab(cd)?e');
});

router.get(/f/, function (req, res) {
    res.send(req.url + 'EXP: /f/');
});

router.get('/example/a', function (req, res) {
    res.send('Example A');
});

router.get('/example/b', function (req, res, next) {
    console.log('next...');
    next();
}, function (req, res) {
    res.send('Example B');
});

router.get('/example/c', [
    function (req, res, next) {
        console.log('first');
        next();
    },
    function (req, res, next) {
        console.log('second');
        next();
    },
    function (req, res) {
        console.log('third');
        res.send(req.url);
    }
]);

module.exports = router;
