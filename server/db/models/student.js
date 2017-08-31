'use strict';
const Sequelize = require('sequelize');
const db =  require('../db');
const Campus =  require('./campus');

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  campusName: {
    type: Sequelize.STRING
  },
})

Campus.hasMany(Student)
Student.belongsTo(Campus) //----> Adds 'campusId' to Student

module.exports = Student;
