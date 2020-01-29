//importing controllers for all models
// =============================================================
const userController = require('./controllers/usersController');
const projectController = require('./controllers/projectsController');
const cohortController = require('./controllers/cohortsController');
const activityController = require('./controllers/activityFeedController');
const resourceController = require('./controllers/resourceController');

module.exports = function (app, passport) {

    //Authentication through gitHub
    // =============================================================

    //Route for github authentication and login
    app.get('/auth/github', passport.authenticate('github', {
        scope: ['user:email']
    }));

    //Handle the call back after github has authenticated the user
    app.get('/auth/github/callback',
        passport.authenticate('github', {
            failureRedirect: '/'
        }),
        function (req, res) {

            // console.log("inside auth callback")
            // Successful authentication, redirect dashboard.
            console.log("logged in");

            // console.log(req);
            // console.log(req.session);
            // console.log(req.user);          

            //provide code
            // console.log('req.query', req.query);

            //will return true if logged in
            // console.log(req.isAuthenticated())

            //provide user profile
            // console.log(req.user);

            if (req.session.cohortCode) {

                req.body.cohortId = req.session.cohortId;
                req.body.update = {
                    $addToSet: {
                        members: req.user._id
                    }
                };               
                cohortController.update(req);

                req.body.activityData = {
                    event: "member joined cohort",
                    project_id: req.body.projectId,
                    resource_id: req.body.resourceId,
                    user_id: req.user._id,
                    cohort_id:req.session.cohortId
                }

                activityController.create(req);
                
                res.redirect('/');
            } else {
                // console.log("in else statement");
                cohortController.verifyMember(req, res).then(result => {
                    // console.log(result);
                    // console.log("req.session", req.session);
                    if (result) {
                        req.session.cohortCode = result.code;
                        req.session.cohortId = result._id;
                        res.redirect('/');
                    }else{
                        res.redirect('/cohortCodeLogin');
                    }
                });
            }
        });

    //Authentication check 
    app.get('/auth/checkLoggedIn', isLoggedIn, (req, res) => {
        let userLog = {
            login: true,
            user: req.user,
            cohortCode:req.session.cohortCode,
            cohortId:req.session.cohortId
        }
        res.send(userLog);
    });

    //Check to see if member is a part of a cohort
    app.get('/auth/memberCohort', cohortController.verifyMember);

    //Check to see if specific COHORT exists and pull data based on code
    app.get('/auth/cohortVerify', cohortVerified, function (req, res) {
        console.log("cohort exists");
        res.send({
            cohortExists: true
        });
    });

    //Logout route
    app.get('/auth/logout', (req, res) => {
        req.logout();
        req.session.destroy();
        res.redirect('/');
    });


    //API Routes
    // =============================================================

    //Routes to pull all data for all models
    // =============================================================

    //All USER data
    app.get('/api/users', userController.index);

    //All PROJECT data
    app.get('/api/projects', projectController.index);

    //All PROJECT data
    app.get('/api/resources', resourceController.index);

    //All COHORT data
    app.get('/api/cohorts', cohortController.index);

    //All ACTIVITY FEED data
    app.get('/api/activityfeed', activityController.index);


    //Routes to pull specific data for all models
    // =============================================================

    //All PROJECTS for specific user in a specific cohort
    app.get('/api/projectsDashboard', projectController.dashboard);

    //All PROJECTS for specifc user in a specific cohort aggregated
    app.get('/api/projectsUserProfile', projectController.profile);

    //All data for a specific PROJECT
    app.get('/api/projectData/:cohort/:username/app/:project', projectController.oneProject);
    //All data for a specific PROJECT
    app.get('/api/resourceData/:cohort/:username/app/:resource', resourceController.oneResource);

    //All chat data for a specific PROJECT
    app.get('/api/projectChat', projectController.chat);

      //All chat data for a specific PROJECT
      app.get('/api/resourceChat', resourceController.chat);

    //Last 10 activities sorted by auto created ID
    app.get('/api/activityfeed/latest', activityController.feed);



    //Routes to create instaces on for all models
    // =============================================================

    //USER record will be created through the authentication process
    //New user ACTIVITY will also be generated by the authentication process
    //refer to config/passport.js

    //Create a new instance of a PROJECT
    //New project ACTIVITY will also be generated 
    app.post('/api/projectNew', projectController.create);

    //New project ACTIVITY will also be generated 
    app.post('/api/resourceNew', resourceController.add);

    //Create a new instance of a COHORT
    app.post('/api/cohortNew', cohortController.create);

    //ACTIVITY will be generated as a result of other transactions.


    //Routes to update properties for all models
    // =============================================================

    //Update USER property
    app.patch('/api/users', userController.update);

    //Update PROJECT property
    app.patch('/api/projects', projectController.update);

     //Update PROJECT property
     app.patch('/api/resources', resourceController.update);

    //Update COHORT property
    app.patch('/api/cohorts', cohortController.update);

    //Update ACTIVITY property
    app.patch('/api/activityfeed', activityController.update);


    //Routes to deactivate instance on a model
    // =============================================================

    //Deactivate USER
    //Will update isActive property to false
    app.patch('/api/userDeactivate', userController.deactivate);

    //Close PROJECT
    //Will update status property to closed
    app.patch('/api/projectClose', projectController.close);

    //Close PROJECT
    //Will update status property to closed
    app.patch('/api/resour eClose', resourceController.close);
    //Deactivate COHORT
    //Will update isActive property to false
    app.patch('/api/cohortDeactivate', cohortController.deactivate);

    //Hide ACTIVITY
    //will update visible to false
    app.patch('/api/activityHide', activityController.hide);


    //TEST ROUTES
    // =============================================================    

    //check to see if req.User is populated
    app.get('/test/reqUser', (req, res) => {
        console.log("req.user: ",req.user);
        console.log("req.session: ", req.session);
        res.json(req.user);
    })

};

//route middleware to make sure a user is logged in 
function isLoggedIn(req, res, next) {

    // console.log('inside is Logged in function');
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) return next();

    // if they aren't redirect them to the home page
    // res.redirect('/');

    let userLog = {
        login: false,
        user: req.user
    }
    res.send(userLog);
};

function cohortVerified(req, res, next) {

    cohortController.verify(req, res).then(result => {
        if (result) {
            req.session.cohortCode = result.code;
            req.session.cohortId = result._id;
            return next();
        }
        console.log("cohort doesn't exist");
        res.send({
            cohortExists: false
        });
    })
};
