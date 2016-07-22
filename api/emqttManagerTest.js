'use strict';
//import emqttManager from './emqttManager.js'
var emqttManager = require('./emqttManager.js');

var emqttManagerTest = {
  run: function() {
    emqttManager.init("http://localhost:18083");
    emqttManager.getTopics(function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      } else {
        console.log(error, response.statusCode);
      }
    });
    emqttManager.addDashboardUser("test", "123456", "linklike", function(error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body);
      } else {
        console.log(error, response.statusCode);
      }
    });
  }
};

module.exports = emqttManagerTest;
