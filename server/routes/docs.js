var express = require('express');
var router = express.Router();
var path = require('path');


//This is a route handler for get requests
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/docs.html'));
});

module.exports = router;


// ? Other route handlers: router.post(), router.put(), router.delete(),

// ? The path.join(__dirname, '../views/docs.html') part constructs the absolute path to the docs.html file

// ? __dirname represents the directory of the current module (docs.js), and ../views/docs.html is the relative path to the docs.html file from the docs.js file.