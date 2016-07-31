'use strict';

var logger = require('tracer').colorConsole();

exports.addPubber = function(req, res) {
  var topicId = req.body.topicId;
  var userId = req.body.userId;
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;
  var workflow = req.app.utility.workflow(req, res);
  var emqttManager = req.app.utility.emqttManager;

  workflow.on('validate', function() {
    //TODO: validate
    workflow.emit('addPubber');
  });

  workflow.on('addPubber', function() {
    Topic.findOne({where: {id: topicId}}).then(function(topic) {
      if (topic === null) {
        workflow.outcome.errors.push('invalid topicId');
        return workflow.emit('response');
      }
      User.findOne({where: {id: userId}}).then(function(user) {
        if (user === null) {
          workflow.outcome.errors.push('invalid userId');
          return workflow.emit('response');
        }
        emqttManager.addAclPermission(user.username, "publish", topic.topic, function() {
          topic.addPubber(user);
          return workflow.emit('response');
        });
      });
    });
  });

  workflow.emit('validate');
};

exports.getPubbers = function(req, res) {
  var topicId = req.body.topicId;
  var workflow = req.app.utility.workflow(req, res);
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;

  workflow.on('validate', function() {
    //TODO: validate
    workflow.emit('getPubbers');
  });

  workflow.on('getPubbers', function() {
    Topic.findOne({where: {id: topicId}}).then(function(topic) {
      if (topic === null) {
        workflow.outcome.errors.push('invalid topicId');
        return workflow.emit('response');
      }
      topic.getPubbers().then( function(users) {
        logger.trace(users);
        workflow.outcome.data = users;
        return workflow.emit('response');
      });
    });
  });

  workflow.emit('validate');
};

exports.addSubber = function(req, res) {
  logger.trace(req.body);
  var topicId = req.body.topicId;
  var userId = req.body.userId;
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    //TODO: validate
    workflow.emit('addSubber');
  });

  workflow.on('addSubber', function() {
    User.findOne({where: {id: userId}}).then(function(user) {
      if (user === null) {
        workflow.outcome.errors.push('invalid userId');
        return workflow.emit('response');
      }

      Topic.findOne({where: {id: topicId}}).then(function(topic) {
        if (topic === null) {
          workflow.outcome.errors.push('invalid topicId');
          return workflow.emit('response');
        }
          
        topic.addSubber(user);
        return workflow.emit('response');
      });
    });    
  });

  workflow.emit('validate');
};

exports.getSubbers = function(req, res) {
  var topicId = req.body.topicId;
  var workflow = req.app.utility.workflow(req, res);
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;

  workflow.on('validate', function() {
    //TODO: validate
    workflow.emit('getSubbers');
  });

  workflow.on('getSubbers', function() {
    Topic.findOne({where: {id: topicId}}).then(function(topic) {
      if (topic === null) {
        workflow.outcome.errors.push('invalid topicId');
        return workflow.emit('response');
      }
      topic.getSubbers().then( function(users) {
        logger.trace(users);
        workflow.outcome.data = users;
        return workflow.emit('response');
      });
    });
  });

  workflow.emit('validate');
};
