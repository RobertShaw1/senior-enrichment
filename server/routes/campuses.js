const express = require('express');
const router = express.Router();
const models = require('../db/models');
const Campus = models.Campus;

module.exports = router;

// route = api/Campuses --> will get all campuses from the DB
router.get('/', function(req, res, next) {
  Campus.findAll({order: [['name', 'ASC']]})
  .then(campuses => res.json(campuses))
  .catch(next);
})

//GET A SINGLE CAMPUS BY NAME
// This should be based on id, not name
.get('/:campusName', function(req, res, next) {
  let campusName = req.params.campusName;
  Campus.findOne({where: {name: campusName}})
  .then(campus => {
    return campus.getStudents();
  })
  .then(students => { // This is actually a campusWithStudents! The name threw me off
    res.json(students)
  })
  .catch(next)
})

//CREATE A CAMPUS
//Just make it a post to the uri '/'
// No need for addcampus
.post('/addcampus', function(req, res, next) {
  Campus.create({name: req.body.name, image: req.body.image})
  .then(newCampus => {
    res.json(newCampus)
  })
  .catch(next)
})

//UPDATE CAMPUS INFO
// This should be based on id, not name
.put('/:campusName', function(req, res, next) {

  let newCampusName = req.body.newCampusName;
  let oldCampusName = req.params.campusName;

  Campus.findOne({where: {name: oldCampusName}})
  // .then(campus => campus.dataValues)
  .then(campus => {
    console.log('campus = ', campus.name)
    return campus.update({name: newCampusName})
  })
  .then(() => Campus.findAll())
  .then(campuses => {
    console.log('campuses = ', campuses)
    //We should be returning just the updated campus, not all of them.
    res.json(campuses)
  })
  .catch(next)
})

//DELETE A CAMPUS
.delete('/:campusId', function(req, res, next) {
  let campusId = req.params.campusId
  Campus.findById(campusId)
  .then(campus => {
    let destroyedCampus = campus.name;
    campus.destroy();
    return destroyedCampus;
  })
  .then(destroyedCampus => {
    res.send(`You deleted the ${destroyedCampus} Campus`)
  })
  .catch(next)
})
