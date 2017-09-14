//importing controllers for all models
// =============================================================
const userController = require('./controllers/usersController'); 
const projectController = require('./controllers/projectsController');
const cohortController = require('./controllers/cohortsController');
const activityController = require('./controllers/activityFeedController');

module.exports = function (app, passport) {

    //Authentication through gitHub
    // =============================================================

    //route for github authentication and login
    app.get('/auth/github', passport.authenticate('github', {
        scope: ['user:email']
    }));

    //handle the call back after github has authenticated the user
    app.get('/auth/github/callback',
        passport.authenticate('github', {
            failureRedirect: '/login',
            successRedirect: '/dashboard'
        }),
        function (req, res) {
            // Successful authentication, redirect home.
            console.log("logged in");

            //provide code
            // console.log('req.query', req.query);

            //will return true if logged in
            console.log(req.isAuthenticated())

            //provide user profile
            // console.log(req.user)
            res.end();
        });

    //API Routes
    // =============================================================
    
    //Pull all data routes for all models
    
    //All USER data
    app.get('/api/users', userController.index);
    
    //All PROJECT data
    app.get('/api/projects', projectController.index);

    //All COHORT data
    app.get('/api/cohorts', cohortController.index);

    //All ACTIVITY FEED data
    app.get('api/activityfeed', activityController.index);


    //Routes to deactivate instance on a model
    
    //Deactivate USER
    //Will update isActive field to false
    app.patch('/api/userDeactivate', userController.deactivate);



    
};

//route middleware to make sure a user is logged in 
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};