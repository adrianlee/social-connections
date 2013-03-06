var mongoose = require('mongoose');
mongoose.connect('localhost', 'social');

var db = module.exports = {};

var userSchema = {
  facebook_id: String,
  username: String,
  display_name: String,
  gender: String,
  emails: [{ value: String }],
  createdAt: { type: Date, default: Date.now },
};

db.User = mongoose.model('User', mongoose.Schema(userSchema));