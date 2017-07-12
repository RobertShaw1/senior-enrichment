'use strict';
const Sequelize = require('sequelize') ;
const db = require('../index');
const Student = require('./student');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.TEXT
  }
})

module.exports = Campus;
