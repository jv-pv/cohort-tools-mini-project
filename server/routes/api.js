var express = require('express');
var router = express.Router();
var path = require('path');
const Cohort = require("../models/Cohort.model")
const Student = require("../models/Student.model");

// * Cohort Routes

router.get("/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts ->", cohorts);
      res.json(cohorts);
    })
    .catch((error) => {
      console.error("Error while retrieving cohorts ->", error);
      res.status(500).json({error: "Failed to retrieve cohorts"});
    });
});

// ! Create new cohort POST

router.post("/cohorts", (req, res, next) => {
  Cohort.create(req.body)
    .then((createdCohort) => {
      console.log("Successfully created new cohort ==>", createdCohort);
      res.status(201).json(createdCohort);
    })
    .catch((error) => {
      console.error("Could not create new cohort", error);
      if (error.name === "ValidationError") {
        res.status(400).json({ errorMsg: "Invalid cohort data", error });
      } else if (error.code === 11000) {
        res.status(409).json({ errorMsg: "Duplicate field value", error });
      } else {
        res.status(500).json({ errorMsg: "Could not create new cohort", error });
      }
    });
});

// ! Get cohort by ID GET

router.get("/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findById(cohortId)
    .then((cohort) => {
      console.log(`Successfully retrieved cohort ${cohortId} ==>`, cohort);
      res.status(200).json(cohort);
    })
    .catch((error) => {
      console.error(`Failed to retrieve cohort ${cohortId}`, error);
      res.status(500).json({errorMsg: `Failed to retrieve cohort ${cohortId}`, error});
    });
});

// ! Update Cohort by Id PUT

router.put("/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndUpdate(cohortId, req.body, {new: true})
    .then((updatedCohort) => {
      console.log(`Successfully updated cohort ${cohortId}`, updatedCohort);
      res.status(202).json(updatedCohort);
    })
    .catch((error) => {
      console.error(`Failed to update cohort ${cohortId}`, error);
      res.status(500).json({errorMsg: `Failed to update cohort ${cohortId}`, error});
    });
});

// ! Delete Cohort by ID DELETE

router.delete("/cohorts/:cohortId", (req, res, next) => {
  const cohortId = req.params.cohortId;
  Cohort.findByIdAndDelete(cohortId)
    .then((deletedCohort) => {
      console.log(`Successfully deleted cohort ${cohortId}`, deletedCohort);
      res.status(202).json(deletedCohort);
    })
    .catch((error) => {
      console.error(`Failed to delete cohort ${cohortId}`, error);
      res.status(500).json({errorMsg: `Failed to delete cohort ${cohortId}`, error});
    });
});


// * Students Routes

router.get("/students", (req, res) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students ==>", students);
      res.json(students);
    })
    .catch((error) => {
      console.error("Error while retrieving students ==>", error);
      res.status(500).json({error: "Failed to retrieve students", error});
    });
});

// ! Post a new student

router.post("/students", (req, res, next) => {
  Student.create(req.body)
    .then((createdStudent) => {
      console.log("Successfully created new student ==>", createdStudent);
      res.status(201).json(createdStudent);
    })
    .catch((error) => {
      console.error("Could not create new student", error);
      if (error.name === "ValidationError") {
        res.status(400).json({ errorMsg: "Invalid student data", error });
      } else if (error.code === 11000) {
        res.status(409).json({ errorMsg: "Duplicate field value", error });
      } else {
        res.status(500).json({ errorMsg: "Could not create new student", error });
      }
    });
});

// ! Get all students for a given cohort

router.get("/students/cohort/:cohortId", (req, res, next) => {
  Student.find({cohort: req.params.cohortId})
    .populate("cohort")
    .then((students) => {
      console.log(`Successfully found students for cohort ${req.params.cohortId} ==>`, students);
      res.status(201).json(students);
    })
    .catch((error) => {
      console.error(`Error fetching students for cohort ${req.params.cohortId} ==>`, error);
      res.status(500).json({errorMsg: `Error fetching students for cohort ${req.params.cohortId} ==>`, error});
    });
});

// ! Get a student by it's ID

router.get("/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .populate("cohort")
    .then((student) => {
      console.log(`Successfully found student ${studentId} ==>`, student);
      res.status(201).json(student);
    })
    .catch((error) => {
      console.error(`Could not find student ${studentId}`, error);
      res.status(500).json({errorMsg: `Could not find student ${studentId}`, error});
    });
});

// ! Update a specific student by it's ID

router.put("/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findByIdAndUpdate(studentId, req.body, {new: true})
    .then((student) =>{
      console.log(`Successfully updated student ${studentId} ==>`, student);
      res.status(201).json(student);
    })
    .catch((error) => {
      console.error(`Could not find and update student ${studentId}`, error);
      res.status(500).json({errorMsg: `Could not find and update student ${studentId}`, error});
    });
});

// ! Delete a specific student by it's ID

router.delete("/students/:studentId", (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId)
    .then((deletedStudent) => {
      console.log(`Successfully deleted student ${studentId} ==>`, deletedStudent);
      res.status(204).json(deletedStudent);
    })
    .catch((error) => {
      console.error(`Could not find and delete student ${studentId}`, error);
      res.status(500).json({errorMsg: `Could not find and delete student ${studentId}`, error});
    });
});


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, "../views/api.html"))
})

module.exports = router;
