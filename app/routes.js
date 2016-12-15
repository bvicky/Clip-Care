var express = require('express');
var User = require('./models/userModel');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var checkAuthentication = function(req, res, next){
    console.log('checking authentication');
    if(req.isAuthenticated())
        return next();
    res.redirect('/signin');
}

module.exports = function (app, passport) {
    
    var loginRouter = express.Router();

    loginRouter.get('/', function (req, res) {
        res.redirect('/signin')
    });


    
    // Sign In Page Redirection from Dashboard
    loginRouter.get('/signin', function (req, res) {
        console.log(req.flash('message'));
        if (req.flash('message').length > 0)
            res.send('sigin.html', {
                message: "data Ok"
            });
        else
            res.render('signin.html');

    });
    // Redirection for Logout
    loginRouter.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    //Passport Authentication Check
    loginRouter.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash: true
    }));

    //Success or Failure of Passport Authentication Redirect
    loginRouter.route('/home')
        .get(function (req, res) {
            //console.log(req.session.passport.user.role);
            //if (req.session.passport.user.role === "admin") {
              //  res.render('admin.html')
            //} else {
                res.render('home.html')
            //}
        })

    // loginRouter.route('/admin')

    // loginRouter.route('/clincian')
    loginRouter.route('/failure')
        .get(function (req, res) {
            res.redirect('/signin')
        })
        // .post(function (req, res) {
        //     res.redirect('test.html')
        // })

    app.use('/', loginRouter);
}