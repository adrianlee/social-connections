var express = require('express');
    db = require('./mongoose');

var app = module.exports = express();

// list all users
app.get('/users', function (req, res) {
  db.User
  .find({})
  .select('username display_name facebook_id')
  .exec(function (err, doc) {
    res.locals.user = req.user;
    res.locals.users = doc;
    res.render('users');
  });
});

app.get('/sink', function (req, res) {
  res.locals.user = req.user;
  res.render('kitchensink');
});