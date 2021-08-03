const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy
const GithubStrategy = require('passport-github2').Strategy
const LocalStrategy = require('passport-local').Strategy
const keys = require('./config/keys')
// alternate code below:  using ES6
//import express from 'express';

//Create a new express app called app
const app = express();

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
},
    (accessToken, refreshToken, profile, done) => {
        console.log('access: ' + accessToken)
        console.log('refresh: ' + refreshToken)
        console.log(profile)
    }
)
)

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
})
)

app.get('/auth/google/callback', passport.authenticate('google'))

//passport.use(new FacebookStrategy())
//passport.use(new LinkedInStrategy())
//passport.use(new GithubStrategy())
//passport.use(new LocalStrategy())

//look at underlying enviornment (env) and figure out it it provided a port to use
const PORT = process.env.PORT || 5000
//this is the app telling node to listen on port 5000
app.listen(PORT)





/*
//create a route handler looking for the route handler '/' or the root route
// the req is a json object representing the incoming request
// the res is a json object representing the outgoing response
app.get('/', (req, res) => {
    //passing object to function
    res.send({
        hi: 'there',
        bye: 'buddy'
    })
})
*/