const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Student = models.Student;
const Campus = models.Campus;

module.exports = router;


// route = api/Students ---> will get all students from the DB
router.get('/', function(req, res, next) {
  Student.findAll()
  .then(students => res.json(students))
  .catch(next);
})

//CREATE A STUDENT PROFILE
//1. Find the campus - use req.body
//2. Create the student
//3. Set campus for student
.post('/addstudent', function(req, res, next) {
  // console.log(req.body)
  let campusName = req.body.assignedCampus;
  let studentEmail = req.body.email;
  let studentName = req.body.name;

  Campus.findOne({where: {name: campusName}})
  .then(assignedCampus => assignedCampus.dataValues)
  .then(assignedCampus => {
    //assignedCampus = campus instance from the database
    return Student.create({name: studentName, email: studentEmail, campusName: campusName, campusId: assignedCampus.id})
  })
  .then(newStudent => {
    res.json(newStudent);
  })
  .catch(next)
})

//UPDATE A STUDENT PROFILE
.put('/:studentId', function(req, res, next) {
  delete req.body.id;
  let changes = req.body;

  Student.findById(req.params.studentId)
  .then(student => student.update(changes))
  .then(() => Student.findAll())
  .then(students => res.json(students))
  .catch(next)
})

//DELETE A STUDENT PROFILE
.delete('/:studentId', function(req, res, next) {
  let id = req.params.studentId;

  Student.findById(id)
  .then(student => {
    let deletedStudent = student.dataValues;
    student.destroy();
    // console.log('deletedStudent =', deletedStudent);
    res.json(deletedStudent);
  })
  .catch(next)
})
