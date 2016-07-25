'use strict';

module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define('topic',
    {
      topic: { type: DataTypes.STRING },
      search: { type: DataTypes.ARRAY(DataTypes.STRING) }
    },
    {
      classMethods: {
      }
    }
  );

  return Topic;
}
