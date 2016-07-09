var mqtt = require('mqtt');
var moment = require('moment');

var brokerAddr;
var brokerID;
var redis;

var topicRouter = {
//  '/neuro/weather': onMsgNeuroWeather,
//  '/sensor/neurite-00016694/out': onMsgOffice,
}

module.exports.start = function(broker, redisClient) {
  brokerAddr = broker;
  redis = redisClient;

  mqttClient = mqtt.connect('mqtt:' + brokerAddr);

  mqttClient.on('connect', function() {
    console.log("connected mqtt broker");
    mqttClient.subscribe(Object.keys(topicRouter), function(err, granted) {
        console.log("sub", granted);
    });

    mqttClient.on("message", onMsgMqtt);
  });
}

function onMsgMqtt(topicStr, message) {
    var topic = topicStr.split("/"); 
    //console.log(topic, message.toString());

    var tpKey = topic.shift();
    switch(tpKey) {
        case "$SYS":
            onMsgSys(topic, message);
            break;
        case "":
            onMsgMain(topicStr, message);
            break;
        default:
            console.log("unsupported topic key:", tpKey );
            return -1;
    } 
}

function onMsgSys(topic, message) {
    var tpKey = topic.shift();
    if (tpKey === broker) {
        tpKey = topic.shift();
        switch(tpKey) {
            case "disconnect":
                var device = message.toString();
                console.log("client disconnected: ", device);
                var Fiber = Npm.require('fibers');
                Fiber(function() {
                    deviceProfileAll.collec.update({name:device}, {$set:{isOnline:false}});
                }).run();
                break;
            case "new":
                var device = message.toString();
                console.log("client connected: ", device);
                var Fiber = Npm.require('fibers');
                Fiber(function() {
                    deviceProfileAll.collec.update({name:device}, {$set:{isOnline:true}});
                }).run();
                break;
            default:
        }
    }
}

function onMsgMain(topicStr, message) {
  for (var k in topicRouter) {
    if (k == topicStr) {
      topicRouter[k](message);
    }
  }
}

function onMsgOffice(message) {
  if (message.toString().substring(0,7) == "checkin") {
    return 
  }
  var data = JSON.parse(message);
  var ts = moment().valueOf();
  data.ts = ts;
  redis.lpush('office', JSON.stringify(data));
}

function onMsgNeuroWeather(message) {
  //console.log("handle", message.toString());
  var data = JSON.parse(message);
  var ts = moment().valueOf();
  data.ts = ts;
  redis.lpush('weather-'+ data.City, JSON.stringify(data));
}

function onMsgNotifi() {
  console.log("handle", message.toString());
}

function getIPAddress() {
  var interfaces = Npm.require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];

    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }

  return '0.0.0.0';
}
