'use strict';

var request = require('request');

var TopicManager = {
  init: function(emqtt_uri) {
    this.emqtt_uri = emqtt_uri; 
  },

  get: function(callback) {
    request(this.emqtt_uri + '/api/topics', {
      'auth': {
        'user': 'admin',
        'pass': 'public'
      }},
      callback
    )
  }
};

module.exports = TopicManager;
