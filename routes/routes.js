var express = require('express');
var router = express.Router();

router.get('/', require('./user').get);
router.get('/user', require('./user').get);

router.get('/neuriteSensor', require('./neuriteSensor.js').get);

router.get('/login', require('./login').init);
router.post('/login/', require('./login').login);
router.get('/signup/', require('./signup').init);
router.post('/signup/', require('./signup').signup);
router.get('/logout', require('./logout').init);

router.post('/data', require('./data').fetch);
router.post('/user/addPubbee', require('./../api/user').addPubbee);
router.post('/user/getPubbees', require('./../api/user').getPubbees);
router.post('/user/addSubbee', require('./../api/user').addSubbee);
router.post('/user/getSubbees', require('./../api/user').getSubbees);

router.post('/topic/addSubber', require('./../api/topic').addSubber);
router.post('/topic/addPubber', require('./../api/topic').addPubber);
router.post('/topic/getPubbers', require('./../api/topic').getPubbers);
router.post('/topic/getSubbers', require('./../api/topic').getSubbers);

module.exports = router;
