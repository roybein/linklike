'use strict';
var logger = require('tracer').colorConsole();
var emqttManager = require('./emqttManager.js');

var emqttManagerTest = {
  run: function(emqtt_uri, emqtt_redis) {
    emqttManager.init(emqtt_uri, emqtt_redis);

    // emqttManager.getTopics(function(error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     logger.trace(body);
    //   } else {
    //     logger.trace(error, response.statusCode);
    //   }
    // });

    emqttManager.addDashboardUser("test", "123456", "linklike", function(error, response, body) {
      if (!error && response.statusCode == 200) {
        logger.trace(body);
      } else {
        logger.trace(error, response.statusCode);
      }
    });

    emqttManager.addUser("mqtt_user:test", "123456", function() {
      logger.trace("addUser done");
    });
  }
};

module.exports = emqttManagerTest;
