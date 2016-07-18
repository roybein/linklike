var express = require('express');
var router = express.Router();

router.get('/', require('./notifiDev').get);
router.get('/notifiDev', require('./notifiDev').get);

router.get('/neuriteSensor', require('./neuriteSensor.js').get);

router.get('/login', require('./login').init);
router.post('/login/', require('./login').login);
router.get('/signup/', require('./signup').init);
router.post('/signup/', require('./signup').signup);
router.get('/logout', require('./logout').init);

router.post('/data', require('./data').fetch);
router.post('/notifi/new', require('./../api/notifi').new);
router.post('/notifi/fetch', require('./../api/notifi').fetch);
router.post('/notifi/link', require('./../api/notifi').link);

module.exports = router;
