var express = require('express');
var router = express.Router();

router.get('/', require('./topicDev').get);
router.get('/topicDev', require('./topicDev').get);

router.get('/neuriteSensor', require('./neuriteSensor.js').get);

router.get('/login', require('./login').init);
router.post('/login/', require('./login').login);
router.get('/signup/', require('./signup').init);
router.post('/signup/', require('./signup').signup);
router.get('/logout', require('./logout').init);

router.post('/data', require('./data').fetch);
router.post('/topic/new', require('./../api/topic').new);
router.post('/topic/fetch', require('./../api/topic').fetch);
router.post('/topic/addSubber', require('./../api/topic').addSubber);
router.post('/topic/addPubber', require('./../api/topic').addPubber);

module.exports = router;
