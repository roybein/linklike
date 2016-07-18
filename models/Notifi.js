'use strict';

module.exports = function(sequelize, DataTypes) {
  var Notifi = sequelize.define('notifi',
    {
      topic: { type: DataTypes.STRING },
      search: { type: DataTypes.ARRAY(DataTypes.STRING) }
    },
    {
      classMethods: {
      }
    }
  );

  return Notifi;
}
