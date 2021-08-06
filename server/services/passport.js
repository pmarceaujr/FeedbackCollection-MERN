const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const GithubStrategy = require('passport-github2').Strategy
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('users') //one argument means we are fetching
const keys = require('../config/keys')

//BEGIN GOOGLE PASSPORT CODE
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        console.log(profile.displayName)
        console.log(profile.id)
        User.findOne({ google_id: profile.id })
            .then((userExists) => {
                if (userExists) {
                    console.log('User already in the DB.')
                }
                else {
                    new User({ google_id: profile.id }).save()
                }
            })

    }
)
)


//END GOOGLE PASSPORT CODE

//BEGIN FACEBOOK PASSPORT CODE
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback'
},

    (accessToken, refreshToken, profile, done) => {
        console.log(profile.displayName)
        console.log(profile.id)
        User.findOne({ facebook_id: profile.id })
            .then((userExists) => {
                if (userExists) {
                    console.log('User already in the DB.')
                }
                else {
                    new User({ facebook_id: profile.id }).save()
                }
            })
    }

    // function(accessToken, refreshToken, profile, cb) {
    //   User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //     return cb(err, user);
    //   });
    // }
));


//passport.use(new LinkedInStrategy())
//passport.use(new GithubStrategy())
//passport.use(new LocalStrategy())