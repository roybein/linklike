var express = require('express');
var i18n = require('i18n');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var logger = require('tracer').colorConsole();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var csrf = require('csurf');
var passport = require('passport');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(session);
var ioredis = require('ioredis');

var config = require('./config');
var router = require('./routes/routes');

var app = express();

// configuration
app.config = config;

// view engine setup
app.set('views', path.join(__dirname, '/dist/views'));
app.set('view engine', 'jade');

// models
app.db = require('./models/models.js');
app.db.sequelize.sync().then(function() {
  logger.trace("sequelize sync done");
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, './ui/public', 'favicon.ico')));

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.cryptoKey));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.cryptoKey,
  store: new mongoStore({ url: config.mongodb.uri })
}));


// i18n
i18n.configure({
  locales:['en', 'zh'],
  directory: __dirname + '/ui/locales',
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
  queryParameter: 'lang'
});
app.use(i18n.init);

app.use(passport.initialize());
app.use(passport.session());
//app.use(csrf({ cookie: { signed: true } }));

// locals
app.use(function(req, res, next) {
  //res.cookie('_csrfToken', req.csrfToken());
  res.locals.user = {};
  //res.locals.user.defaultReturnUrl = req.user && req.user.defaultReturnUrl();
  res.locals.user.username = req.user && req.user.username;
  next();
});

// passport
require("./utils/passport/passport")(app, passport);

// router
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('./ui/public', express.static(path.join(__dirname, 'public')));
app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error/error', {
    message: err.message,
    error: {}
  });
});

app.utility = {};
app.utility.sendmail = require('./utils/sendmail');
app.utility.slugify = require('./utils/slugify');
app.utility.workflow = require('./utils/workflow');
app.utility.redis = new ioredis();

var emqttManagerTest = require('./api/emqttManagerTest.js');
emqttManagerTest.run();

//rawdata = require('./utils/rawdata/rawdata.js');
//rawdata.start('mqtt_node_pek2.0x61.me', app.utility.redis);
//rawdata.start('mqtt.0x61.me', app.utility.redis);

app.listen(app.config.port, function() {
  logger.trace("listen", app.config.port);
});

module.exports = app;
