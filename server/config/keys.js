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




/*
module.exports = {
    googleClientID: '574698205636-378u2tr60o22n8u3fk4u4edtgddueooq.apps.googleusercontent.com',
    googleClientSecret: 'Vu_NaVU1EliQcwbpcbBBbsua',
    facebookClientID: '593767521673359',
    facebookClientSecret: 'd7c21ab3b00aae175c530b336cd9cded',
    mongoURI: 'mongodb+srv://pmarceaujr:Mongodb4Me@feedbackcollector.gb4vq.mongodb.net/FeedbackCollector?retryWrites=true&w=majority',
    cookieKey: 'thisIsMySecretCookieKey123',
    mongodb_prod: 'mongodb+srv://pmarceaujr:Mongodb4Me@cluster0.sd51y.mongodb.net/Feedback-Prod?retryWrites=true&w=majority'
}
*/