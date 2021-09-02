const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
//const FacebookStrategy = require('passport-facebook').Strategy
//const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
//const GithubStrategy = require('passport-github2').Strategy
//const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('users') //one argument means we are fetching

// Define a function and pass it to serializeUser
//The user arg is whatever user model we just returned from the DB
//done is a callback
passport.serializeUser((user, done) => {
    done(null, user.id)  //user record ID
})

passport.deserializeUser((id, done) => {
    // DB call creates a promise can use .then
    User.findById(id)  //user record ID
        //user model that was returned from the DB
        .then(user => {
            done(null, user)
        })
    console.log(`unid: ${id}`)
})

//BEGIN GOOGLE PASSPORT CODE
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
},
    (accessToken, refreshToken, profile, done) => {
        console.log(profile.displayName)
        console.log(profile.id)
        //Call to MongoDB, it is an async operation and creates a promise so we can chain on a .then to determine next steps when the call returns        
        User.findOne({ google_id: profile.id })
            .then((userExists) => {
                if (userExists) {
                    console.log('User already in the DB.')
                    //call done function to indicate the function is "done"
                    //if all went well then pass null to indicate nothing went wrong and here is the user record we found, so all good
                    done(null, userExists)
                }
                else {
                    //any DB operation is async so want to call "done" when really done
                    //again, all DB calls create a promise and use .then to do next action when call is complete
                    new User({ google_id: profile.id }).save()  //This creates a new User instance and is save to the DB
                        .then(user => done(null, user))             //This returns another instance of the same user, but we use this one because it is "fresher"
                }
            })

    }
)
)
//END GOOGLE PASSPORT CODE

//BEGIN FACEBOOK PASSPORT CODE
/*passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: '/auth/facebook/callback'
},
    (accessToken, refreshToken, profile, done) => {
        console.log(profile.displayName)
        console.log(profile.id)
        //Call to MongoDB, it is an async operation and creates a promise so we can chain on a .then to determine next steps when the call returns
        User.findOne({ facebook_id: profile.id })
            .then((userExists) => {
                if (userExists) {
                    console.log('User already in the DB.')
                    //call done function to indicate the function is "done"
                    //if all went well then pass null to indicate nothing went wrong and here is the user record we found, so all good
                    done(null, userExists)
                }
                else {
                    //any DB operation is async so want to call "done" when really done
                    //again, all DB calls create a promise and use .then to do next action when call is complete
                    new User({ facebook_id: profile.id }).save()  //This creates a new User instance and is save to the DB
                        .then(user => done(null, user))             //This returns another instance of the same user, but we use this one because it is "fresher"
                }
            })
    }
));
*/
//END FACEBOOK PASSPORT CODE

//passport.use(new LinkedInStrategy())
//passport.use(new GithubStrategy())
//passport.use(new LocalStrategy())