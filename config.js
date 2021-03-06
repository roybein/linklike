'use strict';

exports.port = process.env.PORT || 4000;
exports.redis = {
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379
};
exports.mongodb = {
  uri: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/linkgo'
};
exports.emqtt = {
  uri: process.env.EMQTT_URI || 'http://localhost:10183'
}
exports.companyName = 'Linkgo LLC.';
exports.projectName = 'linklike';
exports.systemEmail = 'your@email.addy';
exports.cryptoKey = 'eb3EcomyI7';
exports.loginAttempts = {
  forIp: 50,
  forIpAndUser: 7,
  logExpiration: '20m'
};
exports.requireAccountVerification = false;
exports.smtp = {
  from: {
    name: process.env.SMTP_FROM_NAME || exports.projectName +' Website',
    address: process.env.SMTP_FROM_ADDRESS || 'your@email.addy'
  },
  credentials: {
    user: process.env.SMTP_USERNAME || 'your@email.addy',
    password: process.env.SMTP_PASSWORD || 'bl4rg!',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    ssl: true
  }
};
exports.oauth = {
  twitter: {
    key: process.env.TWITTER_OAUTH_KEY || '',
    secret: process.env.TWITTER_OAUTH_SECRET || ''
  },
  facebook: {
    key: process.env.FACEBOOK_OAUTH_KEY || '',
    secret: process.env.FACEBOOK_OAUTH_SECRET || ''
  },
  github: {
    key: process.env.GITHUB_OAUTH_KEY || '',
    secret: process.env.GITHUB_OAUTH_SECRET || ''
  },
  google: {
    key: process.env.GOOGLE_OAUTH_KEY || '',
    secret: process.env.GOOGLE_OAUTH_SECRET || ''
  },
  tumblr: {
    key: process.env.TUMBLR_OAUTH_KEY || '',
    secret: process.env.TUMBLR_OAUTH_SECRET || ''
  }
};
