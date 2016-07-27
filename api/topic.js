'use strict';

var logger = require('tracer').colorConsole();

exports.fetch = function(req, res) {
  logger.trace(req.body);
  var username = req.body.username;
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    //TODO: validate
    workflow.emit('fetch');
  });

  workflow.on('fetch', function() {
    //logger.trace("username:", username);
    var conditions = {};
    if(username === undefined) {
      logger.trace("no username param, try to fetch topics of currentUser");
      if (req.user === undefined) {
        logger.trace("no currentUser login");
        workflow.outcome.errors.push('invalid userId');
        return workflow.emit('response');
      }
      conditions.id = req.user;
    } else {
      logger.trace("fetch topics of", username);
      conditions.username = username;
    }
    
    User.findOne({where: conditions}).then(function(user) {
      //logger.trace(user);
      user.getPubs().then(function(topics) {
        //logger.trace(topics);
        workflow.outcome.data = topics;
        return workflow.emit('response');
      });
    });
  });

  workflow.emit('validate');
};

exports.new = function(req, res) {
  logger.trace(req.body);
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;
  var workflow = req.app.utility.workflow(req, res);
  var topic = req.body.topic;

  //TODO: bind with current user, now for dev
  var userId = req.user;
  if (userId === undefined) {
    userId = req.body.userId;
  }

  workflow.on('validate', function() {
    //TODO: validate
    workflow.emit('new');
  });

  workflow.on('new', function() {
    User.findOne({where: {id: userId}}).then(function(user) {
      if (user === null) {
        workflow.outcome.errors.push('invalid userId');
        return workflow.emit('response');
      }

      Topic.create({topic: topic}).then(function(topic) {
        topic.addPubber(user);
        topic.addSubber(user);
        workflow.outcome.data = {topic: topic};
        return workflow.emit('response');
      });
    });    
  });

  workflow.emit('validate');
};

exports.addPubber = function(req, res) {
  var topicId = req.body.topicId;
  var userId = req.body.userId;
  var workflow = req.app.utility.workflow(req, res);
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;

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
        topic.addPubber(user);
        return workflow.emit('response');
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
