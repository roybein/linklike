'use strict';

module.exports = function(sequelize, DataTypes) {
  var Flow = sequelize.define('flow',
    {
      flow: { type: DataTypes.JSON }
    },
    {
    }
  );

  return Flow;
}

