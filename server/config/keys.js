//keys.js - code to figure out dev or prod
if (process.env.NODE_ENV === 'production') {
    // we are in production  -return the production keys
    // we will need to require and export the prod.js file, this can be done in one lne of code
    module.exports = require('./prod.js')
}
else {
    // we are in development, return the dev keys
    // we will need to require and export the dev.js file, this can be done in one lne of code
    module.exports = require('./dev.js')
}


