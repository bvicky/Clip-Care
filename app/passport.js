var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcryptjs');
var flash = require('connect-flash');
var Credential = require('./models/credentialModel')

module.exports = function(passport) {

    passport.serializeUser(function(Credential, done) {
        // var sessionUser = {_id: Credential._id, userId: Credential.userId,role: Credential.role}
        // console.log(sessionUser);
        // done(null, sessionUser);

         done(null, Credential._id);
    });

    //passport.deserializeUser(function(sessionUser, done) {
        // User.findById(username, function(err, User) {
        //done(null, sessionUser);
        // });
    passport.deserializeUser(function(id, done) {
        Credential.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use('login', new LocalStrategy({
            passReqToCallback: true,
            usernameField: 'userId',
            passwordField: 'userPassword'
        },
        function(req, username, password, done) {
            // check in mongo if a user with username exists or not
            Credential.findOne({
                    'userId': username
                },

                function(err, Credential) {
                    // In case of any error, return using the done method
                    if (err)
                        return done(err);
                    // Username does not exist, log error & redirect back
                    if (!Credential) {
                        console.log('User Not Found with username ' + username);
                        return done(null, false, req.flash('message', 'User Not found.'));

                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(Credential, password)) {
                        console.log('Invalid Password' + password);
                        return done(null, false, req.flash('message', 'Invalid Password'));
                        console.log(req.flash('message', 'Invalid Password'));
                    }
                    // User and password both match, return user from
                    // done method which will be treated like success
                    return done(null, Credential);
                }
            );
        }));

    var isValidPassword = function(Credential, password) {
        console.log(password);
        return bCrypt.compareSync(password, Credential.password);

    }
}
