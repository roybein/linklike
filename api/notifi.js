'use strict';

exports.fetch = function(req, res) {
  console.log(req.body);
  var Notifi = req.app.db.models.Notifi;
  var workflow = req.app.utility.workflow(req, res);

  workflow.on('validate', function() {
    //TODO: validate
    workflow.emit('fetch');
  });

  workflow.on('fetch', function() {
    Notifi.findAll().then(function(notifis) {
      workflow.outcome.data = notifis;
      return workflow.emit('response');
    });    
  });

  workflow.emit('validate');
};

exports.new = function(req, res) {
  console.log(req.body);
  var Notifi = req.app.db.models.Notifi;
  var User = req.app.db.models.User;
  var workflow = req.app.utility.workflow(req, res);
  var topic = req.body.topic;
  var userId = req.body.userId;

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

      Notifi.create({topic: topic}).then(function(notifi) {
        notifi.addPubber(user);
        return workflow.emit('response');
      });
    });    
  });

  workflow.emit('validate');
};

exports.link = function(req, res) {
  console.log(req.body);
  var Notifi = req.app.db.models.Notifi;
  var User = req.app.db.models.User;
  var workflow = req.app.utility.workflow(req, res);
  var notifiId = req.body.notifiId;
  var userId = req.body.userId;

  workflow.on('validate', function() {
    //TODO: validate
    workflow.emit('link');
  });

  workflow.on('link', function() {
    User.findOne({where: {id: userId}}).then(function(user) {
      if (user === null) {
        workflow.outcome.errors.push('invalid userId');
        return workflow.emit('response');
      }

      Notifi.findOne({where: {id: notifiId}}).then(function(notifi) {
        if (notifi === null) {
          workflow.outcome.errors.push('invalid notifiId');
          return workflow.emit('response');
        }
          
        notifi.addSubber(user);
        return workflow.emit('response');
      });
    });    
  });

  workflow.emit('validate');
};
