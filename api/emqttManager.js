'use strict';

var logger = require('tracer').colorConsole();

var request = require('request');

var emqttManager = {
  init: function(emqtt_uri, emqtt_redis) {
    this.emqtt_uri = emqtt_uri; 
    this.emqtt_redis = emqtt_redis;
  },

  getTopics: function(callback) {
    request(this.emqtt_uri + '/api/topics', {
      'auth': {
        'user': 'admin',
        'pass': 'public'
      }},
      callback
    )
  },

  addDashboardUser: function(username, password, tags, callback) {
    request.post(
      {
        url: this.emqtt_uri + '/api/add_user',
        auth: {
          'user': 'admin',
          'pass': 'public'
        },
        form: {
          user_name: username,
          password: password,
          pwd_1: password,
          tags: tags
        },
      },
      callback
    );
  },

  addUser: function(username, password, callback) {
    this.emqtt_redis.hset(username, 'password', password).then(callback);
  }
};

module.exports = emqttManager;
