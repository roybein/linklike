'use strict';

module.exports.get = function(req, res) {
  req.session.returnUrl = '/';
  res.render(
    'neuriteSensor/neuriteSensor'
  );
};
