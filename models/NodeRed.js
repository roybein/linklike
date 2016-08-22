'user strict';
var NodeRed = require('./NodeRed.js');

models.exports = function(sequelize, DataTypes) {
  var NodeRed = sequelize.define('nodeRed',
    {
    },
    {
      classMethods: {
      }
    }
  );

  return NodeRed;
}
