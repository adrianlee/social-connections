var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    _ = require('lodash');

passport.use(new FacebookStrategy({
    clientID: '421911724567746',
    clientSecret: 'af157dc8c2ad8801808c151d235bbad7',
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.dir(profile);

    accessToken = { accessToken: accessToken };

    done(null, _.extend(_.omit(profile, ['_raw']), accessToken));


    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});