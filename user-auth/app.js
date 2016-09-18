var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http");
var mongodb = require("mongodb");
var passwordHash = require("password-hash");

var app = express();
var server = new mongodb.Server('127.0.0.1', 27017);
var db = new mongodb.Db('user-auth', server);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

db.open(function (err, client) {
  if (err) throw err;
  console.log('已连接到数据库');

  app.users = client.collection('users');
});

app.get('/', function (req, res, next) {
  res.render('index', {title: '主页', authenticated: false});
});

app.get('/login', function (req, res, next) {
  res.render('login', {title: '登录'});
});

app.get('/login/:username', function (req, res, next) {
  res.render('login', {title: '登录', username: req.params.username})
});

app.get('/register', function (req, res, next) {
  res.render('register', {title: '注册'});
});

app.post('/register', function (req, res, next) {
  var user = {
    username: req.body.username,
    nickname: req.body.nickname,
    email: req.body.email,
    password: generatePassword(req.body.password)
  };
  app.users.insertOne(user, function (err, result) {
    if (err) return next(err);
    res.redirect('/login/' + result.ops[0].username);
  });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(3000, function () {
  console.log('服务监听在 *:3000');
});

function generatePassword(password) {
  return passwordHash.generate(password);
}

function checkPassword(password, hashedPassword) {
  return passwordHash.verify(password, hashedPassword);
}
