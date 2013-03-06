// Modules
var express = require('express'),
    http = require('http'),
    hbs = require('hbs'),
    path = require('path'),
    passport = require('passport'),
    _ = require('lodash');

// Libs
var pass = require('./lib/passport');

var app = express();

app.configure(function() {
  app.locals.title = "Social Connections";
  app.set('port', process.argv[2] || process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.logger('dev'));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'components')));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.configure('production', function() {
});

// Handlebars Handlers
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
  var block = blocks[name];
  if (!block) {
      block = blocks[name] = [];
  }

  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
  var val = (blocks[name] || []).join('\n');

  // clear the block
  blocks[name] = [];
  return val;
});

hbs.registerHelper('json', function(json) {
  try {
    return JSON.stringify(json, null, ' ');
  } catch (e) {
    console.log(e);
  }
});


// Routes
app.get('/', function (req, res) {
  res.locals.user = req.user;
  res.locals.session = req.session;
  res.render('index');
});

app.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: [
      'email',
      'user_education_history',
      'user_work_history',
      'read_friendlists',
      'publish_actions'
    ]
  })
);

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
