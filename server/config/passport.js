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
            callbackURL: configAuth.github.callbackURL,
            passReqToCallback: true
        },
        function (req, accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                users.findOne({
                    'github.id': parseInt(profile.id)
                }, function (err, user) {
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
                                event: "User joined",
                                user_id: results._id
                            };

                            activityController.create(req);

                            //Couldn't figure out how to use generic update route in controller file
                            // cohorts.update({
                            //     _id:req.body.cohortId
                            // }, {
                            //     $push:{
                            //         members:results._id
                            //     }
                            // }).catch(err=>{
                            //     console.log(err)
                            // })
                            
                            req.body.update = {
                                $push:{members:results._id}
                            };

                            cohortController.update(req);


                          
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