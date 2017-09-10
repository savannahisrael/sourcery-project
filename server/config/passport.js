// Dependencies
// =============================================================
const GitHubStrategy = require('passport-github2').Strategy;

//loading user model
// =============================================================
const users = require('../app/models/Users');

//loading auth variables
const configAuth = require('./auth');

module.exports = function (passport) {

    //passport session set up
    // =============================================================

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });

    //passport login check
    // =============================================================
    passport.use(new GitHubStrategy({
            clientID: configAuth.github.clientID,
            clientSecret: configAuth.github.clientSecret,
            callbackURL: configAuth.github.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                users.findOne({'github.id': parseInt(profile.id)}, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user);
                    } else {
                        let newUser = new users();
                        
                        newUser.github = profile._json;

                        newUser.save((err, results) => {
                            if (err) {
                                console.log(err)
                            }
                            // console.log(results);
                            console.log("user added to db")
                            return done(err, results);
                        })
                    }
                })
            })
        }
    ));
}