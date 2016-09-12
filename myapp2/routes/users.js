var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('SELECT');
});

router.post('/', function (req, res) {
  res.send('INSERT');
});

router.put('/', function (req, res) {
  res.send('UPDATE');
});

router.delete('/', function (req, res) {
  res.send('DELETE');
});

module.exports = router;
