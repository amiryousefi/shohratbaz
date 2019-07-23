const User = require('../models/user.model');

const passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy
  , dotenv = require('dotenv');

dotenv.config();

// Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the FacebookStrategy within Passport.

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.BASE_URL + process.env.FACEBOOK_CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        // find the user in the database based on their facebook id
        User.findOne({'facebook.id': profile.id}, function (err, user) {

          if (err)
            return done(err);

          // if the user is found, then log them in
          if (user) {
            return done(null, user); // user found, return that user
          }
          else {
            // if there is no user found with that facebook id, create them
            let user = new User({
              facebook:{
                id:profile.id,
                name:profile._json.name,
                access_token:accessToken
              },
            });

            // save our user to the database
            user.save(function (err) {
              if (err)
                throw err;

              // if successful, return the new user
              return done(null, user);
            });

          }
        });
      }
    )
  }
  )
);


exports.auth = function (req, res, next) {
  console.log("facebook auth received");
  passport.authenticate('facebook', {scope: 'email,public_profile,publish_to_groups'})(req, res, next);
};

exports.callback = function (req, res, next) {
  console.log("facebook callback received");
  passport.authenticate('facebook', {successRedirect: '/privacy', failureRedirect: '/'})(req, res, next);
};
