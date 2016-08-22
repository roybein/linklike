'use strict';

module.exports.init = function(req, res) {
  req.logout();
  var returnUrl = 'http://localhost:4000';
  if (req.session.returnUrl) {
    returnUrl = req.session.returnUrl;
  }
  res.redirect(returnUrl);
};
