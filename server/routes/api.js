var express = require('express');
var router = express.Router();
var path = require('path')
const cohorts = require("../cohorts.json")
const students = require("../students.json");

/* GET home page. */
router.get('/api', function(req, res, next) {
  res.sendFile(patch)
})

router.get('/cohorts', function(req, res, next) {
  res.json(cohorts)
});

router.get('/students', function(req, res, next){
  res.json(students)
})

module.exports = router;
