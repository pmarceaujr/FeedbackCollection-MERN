const express = require('express')
// alternate code below:  using ES6
//import express from 'express';

//Create a new express app called app
const app = express();

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

//look at underlying enviornment (env) and figure out it it provided a port to use
const PORT = process.env.PORT || 5000
//this is the app telling node to listen on port 5000
app.listen(PORT)