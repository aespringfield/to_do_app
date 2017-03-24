// requires
var express = require('express');
var router = express.Router();
var path = require('path');

// route
router.get('/', function(req, res) {
  res.sendFile(path.resolve('server/public/views/index.html'));
});

// exports
module.exports = router;
