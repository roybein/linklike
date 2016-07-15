'use strict';

module.exports = function(sequelize, DataTypes) {
  var LoginAttempt = sequelize.define('login_attempt',
    {
      ip: { type: DataTypes.STRING, defaultValue: function(){return ''} },
      user: { type: DataTypes.STRING, defaultValue: function(){return ''} },
      time: { type: DataTypes.DATE,  defaultValue: function(){return Date.now} }
    },
    {
    }
  );

  return LoginAttempt;
}
