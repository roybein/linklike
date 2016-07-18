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
db.models.Notifi = sequelize.import('./Notifi.js');

db.models.Notifi.belongsToMany(db.models.User, { as: 'Pubbers', through: 'publish'});
db.models.User.belongsToMany(db.models.Notifi, { as: 'Pubs', through: 'publish'});
db.models.Notifi.belongsToMany(db.models.User, { as: 'Subbers', through: 'subscribe'});
db.models.User.belongsToMany(db.models.Notifi, { as: 'Subs', through: 'subscribe'});

db.sequelize = sequelize;

module.exports = db;
