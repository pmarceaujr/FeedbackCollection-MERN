// alternate code below:  using ES6
//import express from 'express';
const express = require('express')
const keys = require('./config/keys')
const mongoose = require('mongoose')

// If we do not export anything from a .js file we can just require it as follows... this will trigger it's "execution"
require('./models/user')
require('./services/passport')


//Create a new express app called app
const app = express();

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