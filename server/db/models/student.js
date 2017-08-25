'use strict';
const Sequelize = require('sequelize');
const db =  require('../index');
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

// Campus.hasMany(Student)
Campus.belongsToMany(Student, {through: 'StudentCampus'})
Student.belongsTo(Campus) //----> Adds 'campusId' to Student

module.exports = Student;
