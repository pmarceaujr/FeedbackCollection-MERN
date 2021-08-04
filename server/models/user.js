console.log('In user model')

const mongoose = require('mongoose')
const Schema = mongoose.Schema
// destructured version:
// The mongoose object has a property called Schema, take that property and assign it to a new variable called Schema
// const {Schema} = mongoose

const userSchema = new Schema({
    google_id: String,
    facebook_id: String,
    github_id: String,
    linkedin_id: String,
    localuser_id: String

})

mongoose.model('users', userSchema)  //two arguments means we are trying to load something into mongoDB