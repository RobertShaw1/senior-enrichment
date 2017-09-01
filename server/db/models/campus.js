'use strict';
const Sequelize = require('sequelize') ;
const db = require('../db');
const Student = require('./student');
const Promise = require('bluebird');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING(1000)
  }
})

Campus.beforeDestroy((campus) => {
  Student.findAll({where: {campusName: campus.name}})
  .then(students => {
    Promise.map(students, function(student) {
      //do something with students
    })
  })
})

module.exports = Campus;
