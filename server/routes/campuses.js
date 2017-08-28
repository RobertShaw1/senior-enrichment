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

//GET A SINGLE CAMPUS BY ID
.get('/:campusId', function(req, res, next) {
  let campusId = req.params.campusId
  Campus.findById(campusId)
  .then(campus => {
    res.json(campus)
  })
  .catch(next)
})

//CREATE A CAMPUS
.post('/addcampus', function(req, res, next) {
  Campus.create({name: req.body.name, image: req.body.image})
  .then(newCampus => {
    res.json(newCampus)
  })
  .catch(next)
})

//UPDATE CAMPUS INFO
.put('/:campusId', function(req, res, next) {
  res.send('Updated campus info!')
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
