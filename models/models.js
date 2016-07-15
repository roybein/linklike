'use strict';
var Sequelize = require('sequelize');
var db = {models: {}};

var sequelize = new Sequelize('linklikedb', 'roybein', 'public', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

db.models.User = sequelize.import('./User.js');
db.models.LoginAttempt = sequelize.import('./LoginAttempt.js');
db.sequelize = sequelize;

module.exports = db;
