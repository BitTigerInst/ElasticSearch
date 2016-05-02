'use strict';

var config = require('../config'),
  express = require('./express'),
  chalk = require('chalk');

module.exports.init = function init(callback) {
  var app = express.init();
  if (callback) callback(app, config);
};

module.exports.start = function start(callback) {
  var _this = this;

  _this.init(function (app, config) {

    // Start the app by listening on <port> at <host>
    app.listen(config.port, config.host, function () {
      // Create server URL
      var server = (process.env.NODE_ENV === 'secure' ? 'https://' : 'http://') + config.host + ':' + config.port;
      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
      console.log(chalk.green('Server:          ' + server));
      // console.log(chalk.green('Database:        ' + config.db.uri));
      console.log(chalk.green('App version:     ' + config.elasticsearch.version));

      console.log('--');

      if (callback) callback(app, config);
    });
  });

};