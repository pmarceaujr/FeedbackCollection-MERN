// alternate code below:  using ES6
//import express from 'express';
const express = require('express')
const keys = require('./config/keys')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

// If we do not export anything from a .js file we can just require it as follows... this will trigger it's "execution"
require('./models/user')
require('./services/passport')


//Create a new express app called app
const app = express();



//app.use wires up middleware, which is a small app used to modify incoming requests before they are sent off to route handlers
//Therefore they are a great place to logic that is common to many route handlers
//app.use triggers for every request call

//Tell express to manage cookies using cookie-session - cookie session contains all the data
//There is also an express-session to manage cookies - cookie only contains the id, and all other data is a reference to anther data store
//Cookie is limited in size (14kb), express has much greater storage
app.use(
    cookieSession({
        maxAge: 1000 * 60 * 60 * 24 * 30,   //How long until cookie expires 1000ms * 60s * 60m * 24h * 30 days = 30 days expiration
        keys: [keys.cookieKey]              //Used to encrypt our cookie and stored in the keys file.  it's an array as you can pass more than one
    })
)

//Tell passport to use cookies to handle auth
app.use(passport.initialize())
app.use(passport.session())


// import the routes for the app
// could do:
//const authRoutes = require('./routes/authRoutes')
//then call the function and pass it app
// authRoutes(app)
// OR just call it directly with the require:
require('./routes/authRoutes')(app)



mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});


app.get('/', (req, res) => {
    //passing object to function
    res.send({
        hi: 'there',
        bye: 'buddy'
    })
})




//look at underlying enviornment (env) and figure out it it provided a port to use
const PORT = process.env.PORT || 5000
//this is the app telling node to listen on port 5000
app.listen(PORT)

console.log(`App listening on port: ${PORT}`)



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