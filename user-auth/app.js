var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http");
var mongodb = require("mongodb");
var passwordHash = require("password-hash");
var session = require('express-session');

var app = express();
var server = new mongodb.Server('127.0.0.1', 27017);
var db = new mongodb.Db('user-auth', server);
var port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'Pripara'}));

db.open(function (err, client) {
  if (err) throw err;
  console.log('已连接到数据库');

  app.users = client.collection('users');
  client.ensureIndex('users', 'username', function (err) {
    if (err) throw err;
    client.ensureIndex('users', 'nickname', function (err) {
      if (err) throw err;
      console.log('已建立索引');
      app.listen(port, function () {
        console.log('服务监听在 *:' + port);
      });
    });
  });
});

app.use(function (req, res, next) {
  if (req.session.loggedIn) {
    app.users.findOne({_id: new mongodb.ObjectId(req.session.loggedIn)}, function (err, result) {
      if (err) next(err);
      res.locals.authenticated = true;
      res.locals.me = result;
      next();
    });
  } else {
    res.locals.authenticated = false;
    next();
  }
});

app.get('/', function (req, res, next) {
  res.render('index', {title: '主页'});
});

app.get('/login', function (req, res, next) {
  res.render('login', {title: '登录'});
});

app.post('/login', function (req, res, next) {
  app.users.findOne({username: req.body.username}, function (err, result) {
    if (err) return next(err);
    if (!result) return res.send('用户不存在！');
    if (!checkPassword(req.body.password, result.password)) return res.send('密码错误！');
    req.session.loggedIn = result._id.toString();
    res.redirect('/');
  });
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

app.get('/logout', function (req, res) {
  req.session.loggedIn = null;
  res.redirect('/');
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

function generatePassword(password) {
  return passwordHash.generate(password);
}

function checkPassword(password, hashedPassword) {
  return passwordHash.verify(password, hashedPassword);
}
