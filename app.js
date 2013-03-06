var express = require('express'),
    http = require('http'),
    hbs = require('hbs'),
    path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.argv[2] || process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'hbs');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static(path.join(__dirname, 'components')));
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


// Routes
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/channel.html', function (req, res) {
  res.send('<script src="//connect.facebook.net/en_US/all.js"></script>');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
