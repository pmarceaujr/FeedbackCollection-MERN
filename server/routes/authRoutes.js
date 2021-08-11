const passport = require('passport')


module.exports = app => {
    //Google routes
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    )

    app.get('/auth/google/callback', passport.authenticate('google'))


    //Facebook routes
    app.get('/auth/facebook', passport.authenticate('facebook'))

    app.get('/auth/facebook/callback', passport.authenticate('facebook'))







    //Github routes
    app.get('/auth/github',
        passport.authenticate('github', { scope: ['user:email'] }));

    app.get('/auth/github/callback',
        passport.authenticate('github', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });

    //LinkedIn Routes
    app.get('/auth/linkedin',
        passport.authenticate('linkedin', { state: 'SOME STATE' }),
        function (req, res) {
            // The request will be redirected to LinkedIn for authentication, so this
            // function will not be called.
        });

    app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    //Local Routes


    //Define route and pass the arrow function that will be executed when this route is requested
    //Pass two args to arrow func req and res (incoming request and outgoing response)
    app.get('/api/current_user', (req, res) => {
        res.send(req.user)

    })

    app.get('/api/logout', (req, res) => {
        req.logout()
        res.send(req.user)
    })

};