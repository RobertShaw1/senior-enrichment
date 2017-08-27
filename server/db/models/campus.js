'use strict';
const Sequelize = require('sequelize') ;
const db = require('../index');
// const Student = require('./student');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING(1000)
  }
})

module.exports = Campus;
