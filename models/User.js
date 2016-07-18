'use strict';
var Notifi = require('./Notifi.js');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user',
    {
      username: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING },
      password: { type: DataTypes.STRING },
      search: { type: DataTypes.ARRAY(DataTypes.STRING) }
    },
    {
      classMethods: {
        encryptPassword: function(password, done) {
          var bcrypt = require('bcrypt');
          bcrypt.genSalt(10, function(err, salt) {
            if (err) {
              return done(err);
            }

            bcrypt.hash(password, salt, function(err, hash) {
              done(err, hash);
            });
          });
        },
        validatePassword: function(password, hash, done) {
          var bcrypt = require('bcrypt');
          bcrypt.compare(password, hash, function(err, res) {
            done(err, res);
          });
        }
      }
    }
  );

  return User;
}

