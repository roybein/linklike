'use strict';
//import TopicManager from './TopicManager.js'
var TopicManager = require('./TopicManager.js');

var TopicManagerTest = {
  run: function() {
    TopicManager.init("http://localhost:18083");
    TopicManager.get(function(error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body);
            } else {
              console.log(error, response.statusCode);
            }
          }
    );
  }
};

module.exports = TopicManagerTest;
