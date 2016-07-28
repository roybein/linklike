'use strict';

var logger = require('tracer').colorConsole();

exports.addPubbee = function(req, res) {
  var userId = req.body.userId;
  var topic = req.body.topic;
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    //TODO: consider permission
    if (userId === undefined) {
      logger.warn("no userId param, try to addPubbee to currentUser");
      userId = req.user;
      if (userId === undefined) {
        logger.warn("no currentUser, response error:", "unkown userId");
        workflow.outcome.errors.push('unkown userId');
        return workflow.emit('response');
      }
    }
    workflow.emit('addPubbee');
  });

  workflow.on('addPubbee', function() {
    User.findOne({where: {id: userId}}).then(function(user) {
      if (user === null) {
        logger.warn("invalid userId");
        workflow.outcome.errors.push('invalid userId');
        return workflow.emit('response');
      }

      Topic.create({topic: topic}).then(function(topic) {
        user.addPubbee(topic);
        user.addSubbee(topic);
        workflow.outcome.data = {user: user, topic: topic};
        return workflow.emit('response');
      });
    });    
  });

  workflow.emit('validate');
};

exports.getPubbees = function(req, res) {
  //TODO: consider permission
  var userId = req.body.userId;
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    //TODO: consider permission
    if (userId === undefined) {
      logger.warn("no userId param, try to getPubbees of currentUser");
      userId = req.user;
      if (userId === undefined) {
        logger.warn("no currentUser, response error:", "unkown userId");
        workflow.outcome.errors.push('unkown userId');
        return workflow.emit('response');
      }
    }
    workflow.emit('getPubbees');
  });

  workflow.on('getPubbees', function() {
    User.findOne({where: {id: userId}}).then(function(user) {
      if (user === null) {
        logger.warn("invalid userId");
        workflow.outcome.errors.push('invalid userId');
        return workflow.emit('response');
      }
      user.getSubbees().then(function(topics) {
        workflow.outcome.data = topics;
        return workflow.emit('response');
      });
    });
  });

  workflow.emit('validate');
};

exports.addSubbee = function(req, res) {
  var userId = req.body.userId;
  var topicId = req.body.topicId;
  var workflow = req.app.utility.workflow(req, res);
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;

  workflow.on('validate', function() {
    //TODO: consider permission
    if (userId === undefined) {
      userId = req.user;
      if (userId === undefined) {
        logger.warn("no currentUser, response error:", "unkown userId");
        workflow.outcome.errors.push('unkown userId');
        return workflow.emit('response');
      }
    }
    workflow.emit('addSubbee');
  });

  workflow.on('addSubbee', function() {
    User.findOne({where: {id: userId}}).then(function(user) {
      if (user === null) {
        logger.warn("invalid userId");
        workflow.outcome.errors.push('invalid userId');
        return workflow.emit('response');
      }

      Topic.findOne({id: topicId}).then(function(topic) {
        user.addSubbee(topic);
        workflow.outcome.data = {user: user, topic: topic};
        return workflow.emit('response');
      });
    });    
  
  });
}

exports.getSubbees = function(req, res) {
  var userId = req.body.userId;
  var Topic = req.app.db.models.Topic;
  var User = req.app.db.models.User;
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    //TODO: consider permission
    if (userId === undefined) {
      logger.warn("no userId param, try to getSubbees of currentUser");
      userId = req.user;
      if (userId === undefined) {
        logger.warn("no currentUser, response error:", "unkown userId");
        workflow.outcome.errors.push('unkown userId');
        return workflow.emit('response');
      }
    }
    workflow.emit('getSubbees');
  });

  workflow.on('getSubbees', function() {
    User.findOne({where: {id: userId}}).then(function(user) {
      if (user === null) {
        logger.warn("invalid userId");
        workflow.outcome.errors.push('invalid userId');
        return workflow.emit('response');
      }
      user.getPubbees().then(function(topics) {
        workflow.outcome.data = topics;
        return workflow.emit('response');
      });
    });
  });

  workflow.emit('validate');
}

