var express = require('express');
var router = express.Router();

router.all('/', function (req, res, next) {
  console.log('users');
  next();
});

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('SELECT');
}).post('/', function (req, res) {
  res.send('INSERT');
}).put('/', function (req, res) {
  res.send('UPDATE');
}).delete('/', function (req, res) {
  res.send('DELETE');
});

module.exports = router;
