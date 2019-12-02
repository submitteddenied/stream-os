var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var mongoose = require('mongoose');
//var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  //TODO: find user by email, validate password and call done(null, user) or done(null, false, {errors: {}})
  if(email === "test@test.com" && password === "abcd1234") {
    return done(null, {email: "test@test.com", name: "Test user"})
  } else {
    return done(null, false, {errors: {'email or password': 'is invalid'}});
  }

  /*
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
  */
}));

