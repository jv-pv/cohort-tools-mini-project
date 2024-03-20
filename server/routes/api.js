var express = require('express');
var router = express.Router();
var path = require('path')
// const cohorts = require("../cohorts.json")
// const students = require("../students.json");
const Cohort = require("../models/Cohort.model")
const Student = require("../models/Student.model")

router.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts)
      res.json(cohorts)
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error)
      res.status(500).json({error: "Failed to retrieve cohorts"})
    })
})

router.get("/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students ->", students)
      res.json(students)
    })
    .catch((error) => {
      console.error("Error while retrieving students ->", error)
      res.status(500).json({error: "Failed to retrieve students"})
    })
})



// app.get("/books", (req, res) => {
//   Book.find({})
//     .then((books) => {
//       console.log("Retrieved books ->", books);
//       res.json(books);
//     })
//     .catch((error) => {
//       console.error("Error while retrieving books ->", error);
//       res.status(500).json({ error: "Failed to retrieve books" });
//     });
// });






router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/api.html"))
})

// router.get('/cohorts', function(req, res, next) {
//   res.json(cohorts)
// });

// router.get('/students', function(req, res, next){
//   res.json(students)
// })

module.exports = router;
