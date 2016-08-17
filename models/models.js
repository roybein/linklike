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
db.models.Topic = sequelize.import('./Topic.js');
db.models.nodeRed = {};
db.models.nodeRed.Flow = sequelize.import('./node-red/Flow.js');

db.models.Topic.belongsToMany(db.models.User, { as: 'Pubbers', through: 'publish'});
db.models.User.belongsToMany(db.models.Topic, { as: 'Pubbees', through: 'publish'});
db.models.Topic.belongsToMany(db.models.User, { as: 'Subbers', through: 'subscribe'});
db.models.User.belongsToMany(db.models.Topic, { as: 'Subbees', through: 'subscribe'});

db.sequelize = sequelize;

module.exports = db;
