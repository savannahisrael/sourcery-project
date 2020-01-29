// Dependencies
// =============================================================
const GitHubStrategy = require('passport-github2').Strategy;

//loading user model
// =============================================================
const users = require('../app/models/Users');
const cohorts = require('../app/models/Cohorts');

//loading activity controller
// =============================================================
const activityController = require('../app/controllers/activityFeedController');
const cohortController = require('../app/controllers/cohortsController.js');

//loading auth variables
const configAuth = process.env.NODE_ENV ? {
    github: {
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: process.env.GITHUB_CLIENTSECRET,
        callbackURL: 'https://devcircle.herokuapp.com/auth/github/callback'
    } 
} 
: require('./auth');

module.exports = function(passport) {

    //passport session set up
    // =============================================================

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    //passport login check
    // =============================================================
    passport.use(new GitHubStrategy({
            clientID: configAuth.github.clientID,
            clientSecret: configAuth.github.clientSecret,
            callbackURL: configAuth.github.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            // console.log("before auth starts:", req.session)
            process.nextTick(function() {
                users.findOne({
                    'github.id': parseInt(profile.id)
                }, function(err, user) {
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
                            req.body.activityData = {
                                event: "member joined cohort",
                                user_id: results._id
                            };

                            activityController.create(req);

                            // req.body.cohortId = req.session.cohortId;

                            // req.body.update = {
                            //     $push: { members: results._id }
                            // };

                            // console.log("req.body inside passport:", req.body);

                            // cohortController.update(req);

                            // console.log(req.user);

                            // console.log("results: ", results);
                            //results:
                            // { __v: 0,
                            //     _id: 59b9e3b28316193830f66ff3,
                            //     isActive: true,
                            //     github: { login: 'fbrahman', id: 24260131, name: 'Fahad Rahman' } }

                            console.log("user added to db")
                            return done(err, results);
                        })
                    }
                })
            })
        }
    ));
}