'use strict';

/**
 * Module dependencies.
 */
var config = require('../config'),
  express = require('express'),
  morgan = require('morgan'),
  logger = require('./logger'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  favicon = require('serve-favicon'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  helmet = require('helmet'),
  flash = require('connect-flash'),
  consolidate = require('consolidate'),
  path = require('path');



/**
 * Initialize local variables
 */
module.exports.initLocalVariables = function (app) {
  // Setting application local variables
  app.locals.title = config.app.title;
  app.locals.description = config.app.description;
  if (config.secure && config.secure.ssl === true) {
    app.locals.secure = config.secure.ssl;
  }
  app.locals.keywords = config.app.keywords;
  app.locals.jsFiles = config.files.client.js;
  app.locals.babelJsFiles = config.files.client.babelJs;
  app.locals.cssFiles = config.files.client.css;
  app.locals.livereload = config.livereload;
  app.locals.logo = config.logo;
  app.locals.favicon = config.favicon;

  // Passing the request url to environment locals
  app.use(function (req, res, next) {
    res.locals.host = req.protocol + '://' + req.hostname;
    res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
    next();
  });
};


/**
 * Initialize application middleware
 */
module.exports.initMiddleware = function (app) {
  // Showi¬errors
  app.set('showStackError', true);

  // Enable jsonp
  app.enable('jsonp callback');

  // Should be placed before express.static
  app.use(compress({
    filter: function (req, res) {
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  // Initialize favicon middleware
  app.use(favicon(app.locals.favicon));

  // Enable logger (morgan)
  app.use(morgan(logger.getFormat(), logger.getOptions()));

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Add the cookie parser and flash middleware
  app.use(cookieParser());
  app.use(flash());
};

/**
 * Configure view engine
 */
module.exports.initViewEngine = function (app) {
  // Set swig as the template engine
  app.engine('server.view.html', consolidate[config.templateEngine]);
  // app.engine('server.view.html', require('express-react-views').createEngine('babel'));

  // Set views path and view engine
  app.set('view engine', 'server.view.html');
  app.set('views', './');
  // app.set('views', path.join(__dirname, '../../modules/core/client/views'));
  app.set('view cache', false);
};

/**
 * Configure Helmet headers configuration
 */
module.exports.initHelmetHeaders = function (app) {
  // Use helmet to secure Express headers
  var SIX_MONTHS = 15778476000;
  app.use(helmet.xframe());
  app.use(helmet.xssFilter());
  app.use(helmet.nosniff());
  app.use(helmet.ienoopen());
  app.use(helmet.hsts({
    maxAge: SIX_MONTHS,
    includeSubdomains: true,
    force: true
  }));
  app.disable('x-powered-by');
};

/**
 * Invoke modules server configuration
 */
module.exports.initModulesConfiguration = function (app) {
  config.files.server.configs.forEach(function (configPath) {
    require(path.resolve(configPath))(app);
  });
};

/**
 * Configure the modules static routes
 */
module.exports.initModulesClientRoutes = function (app) {
  // Setting the app router and static folder
  app.use('/', express.static(path.resolve('./public')));

  // Globbing static routing
  config.folders.client.forEach(function (staticPath) {
    app.use(staticPath, express.static(path.resolve('./' + staticPath)));
  });
};


/**
 * Configure Express session
 */
module.exports.initSession = function (app) {
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    cookie: {
      maxAge: config.sessionCookie.maxAge,
      httpOnly: config.sessionCookie.httpOnly,
      secure: config.sessionCookie.secure && config.secure.ssl
    },
    key: config.sessionKey
  }));
};

/**
 * Configure the modules ACL policies
 */
module.exports.initModulesServerPolicies = function (app) {
  // Globbing policy files
  config.files.server.policies.forEach(function (policyPath) {
    require(path.resolve(policyPath)).invokeRolesPolicies();
  });
};

/**
 * Configure the modules server routes
 */
module.exports.initModulesServerRoutes = function (app) {
  // Globbing routing files
  config.files.server.routes.forEach(function (routePath) {
    require(path.resolve(routePath))(app);
  });
};


/**
 * Configure error handling
 */
module.exports.initErrorRoutes = function (app) {
  app.use(function (err, req, res, next) {
    // If the error object doesn't exists
    if (!err) {
      return next();
    }

    // Log it
    console.error(err.stack);

    // Redirect to error page
    res.redirect('/server-error');
  });
};

/**
 * Initialize the Express application
 */
module.exports.init = function () {
  // Initialize express app
  var app = express();

  // Initialize local variables
  this.initLocalVariables(app);

  // Initialize Express middleware
  this.initMiddleware(app);

  // Initialize Express view engine
  this.initViewEngine(app);

  // Initialize Helmet security headers
  this.initHelmetHeaders(app);

  // Initialize modules static client routes, before session!
  this.initModulesClientRoutes(app);

  // Initialize Express session
  this.initSession(app);

  // Initialize Modules configuration
  this.initModulesConfiguration(app);

  // Initialize modules server authorization policies
  this.initModulesServerPolicies(app);

  // Initialize modules server routes
  this.initModulesServerRoutes(app);

  // Initialize error routes
  this.initErrorRoutes(app);

  return app;
};
