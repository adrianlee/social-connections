var express = require('express');
    db = require('./mongoose');

var app = module.exports = express();

// list all users
app.get('/api/users', function (req, res) {
  db.User
  .find({})
  .select('username display_name facebook_id')
  .exec(function (err, doc) {
    res.json(doc);
  });
});