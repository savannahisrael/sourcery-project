const Project = require('../models/Projects');
const activityController = require('../controllers/activityFeedController');
const Cohort = require('../models/Cohorts');
const User = require('../models/Users');

module.exports = {

    //Method to return all Projects
    //populate from Cohorts Users 
    index: (req, res) => {
        Project.find({})
            .populate('owner_id')
            .populate('cohort_id')
            .populate('admin_id')
            .populate('fav_users')
            .populate('done_users')
            .exec((err, data) => {
                if (err) {
                    res.json(err)
                };
                res.json(data)
            })
    },

    //Method to get projects for specific cohort and user
    dashboard: (req, res) => {
        // req.params.cohort = '0417';
        // req.params.username = "cindy";
        let query1 = Cohort.findOne({
            code: req.params.cohort
        }, [{
            "_id": 'cohortId'
        }]);

        let query2 = User.findOne({
            "github.login": req.params.username
        }, "_id");

        Promise.all([query1, query2]).then(
            results => {
                let cohortId = results[0]._id;
                let userId = results[1]._id;

                if (cohortId && userId) {
                    Project.find({
                            cohort_id: cohortId,
                            $or: [{
                                fav_users: userId
                            }, {
                                done_users: userId
                            }]
                        })
                        .populate('admin_id')
                        .popultate('owner_id')
                        .populate('cohort_id')
                        .populate('fav_users')
                        .populate('done_users')
                        .exec((err, data) => {
                            console.log('Resource data:', data)
                            res.json(data);
                        })
                } else {
                    console.log("invalid cohort or user")
                }
            })
            .catch(err => console.log('Project data err:', err));
    },

    //Change to method to aggregate number of favorite, saved, read resources the user has
    //Method to get aggregate number of created counts created and contributed for a specific cohort and user
    profile: (req, res) => {
        // req.params.cohort = '0417';
        // req.params.username = "joe";

        let query1 = Cohort.findOne({
            code: req.params.cohort
        }, [{
            "_id": 'cohortId'
        }]);

        let query2 = User.findOne({
            "github.login": req.params.username
        }, "_id");

        Promise.all([query1, query2]).then(
            results => {
                let cohortId = results[0]._id;
                let userId = results[1]._id;
//saved: user.Id
                if (cohortId && userId) {
                    let query3 = Project.find({
                            cohort_id: cohortId,
                            fav_users: [userId],
                            // owner_id: userId
                        })
                        .count()
//completed : user.Id
                    let query4 = Project.find({
                            cohort_id: cohortId,
                            members: userId,
                            done_users: [userId],
                            owner_id: {
                                $ne: userId
                            }
                        })
                        .count()

                    Promise.all([query3, query4]).then(
                        counts => {

                            let response = {
                                created: counts[0],
                                contributed: counts[1]
                            }
                            res.json(response);
                        }
                    )

                } else {
                    console.log("invalid cohort or user")
                }
            })
    },

    //Public Form (Comments) + Private For Instructors

    //Method to get chat information for a specific Project
    chat: (req, res) => {
        // req.params.cohort = '0417';
        // req.params.username = "fahad";
        // req.params.project = 'testProject4';
        let query1 = Cohort.findOne({
            code: req.params.cohort
        }, [{
            "_id": 'cohortId'
        }]);

        let query2 = User.findOne({
            "github.login": req.params.username
        }, "_id");

        Promise.all([query1, query2]).then(
            results => {
                let cohortId = results[0]._id;
                let userId = results[1]._id;

                if (cohortId && userId) {
                    Project.find({
                            cohort_id: cohortId,
                            user_id: userId,
                            title: req.params.title
                        },
                        "chat"
                    )
                        .exec((err, data) => {
                            res.json(data);
                        })
                } else {
                    console.log("invalid cohort or user")
                }
            })
    },

    //Method to get a specific Project
    oneProject: (req, res) => {
        // req.params.cohort = '0417';
        // req.params.username = "fahad";
        // req.params.project = 'testProject4';
        // console.log("inside One Project ORM");
        // console.log("req.params: ",req.params);
        let query1 = Cohort.findOne({
            code: req.params.cohort
        }, [{
            "_id": 'cohortId'
        }]);

        let query2 = User.findOne({
            "github.login": req.params.username
        }, "_id");

        Promise.all([query1, query2]).then(
            results => {
                // console.log("results: ", results);
                let cohortId = results[0]._id;
                let userId = results[1]._id;

                if (cohortId && userId) {
                    // console.log("query variables inside if statement: ", cohortId, userId, req.params.project)
                    Project.find({
                            cohort_id: cohortId,
                            owner_id: userId,
                            name: req.params.project
                        })
                        .populate('owner_id')
                        .populate('cohort_id', "name code isActive")
                        .populate('admin_id')
                        .populate('fav_users')
                        .populate('done_users')
                        .populate('chat.author_id')
                        .exec((err, data) => {
                            // console.log('Project data:', data)
                            res.json(data);
                        })
                } else {
                    console.log("invalid cohort or user")
                }
            })
            .catch(err => console.log('Project data err:', err));
    },
    //Method to create new Project
    create: (req, res) => {
        // console.log("inside the create project ORM");
        // console.log("req.user", req.user);
        // console.log("req.session", req.session);
        req.body.owner_id = req.user._id;
        req.body.cohort_id = req.session.cohortId;
        Project.create(req.body)
            .then(doc => {

                req.body.activityData = {
                    event: "added",
                    project_id: doc._id, 
                    user_id: req.user._id,
                    cohort_id:req.session.cohortId
                };

                activityController.create(req);

                res.json(doc);
            })
            .catch(err => {
                res.json(err);
            });
    },


    //Need for Upvote/ Downvote
    //Need for Saved, Completed

    // Make seperate adminUpdate to set as recommended or required , visible, disabled (can be visible and recommended)
    
    //Method to update a Project 
    update: (req, res) => {
        // console.log("req.body: ", req.body);
        Project.update({
                _id: req.body.projectId
            }, req.body.update)
            .then(doc => {
                console.log("req.body.update.status: ", req.body.update.status);
                // console.log("doc: ", doc);
                // console.log("req.user", req.user);
                switch (req.body.update.status) {
                    //Activity feed update for project status change for a specific project
                    case "recommended":
                        req.body.activityData = {
                            event: "recommended",
                            project_id: req.body.projectId,
                            user_id: req.user._id,
                            cohort_id:req.session.cohortId
                        }

                        activityController.create(req);
                        return;
                        case "required":
                        req.body.activityData = {
                            event: "required",
                            project_id: req.body.projectId,
                            user_id: req.user._id,
                            cohort_id:req.session.cohortId
                        }

                        activityController.create(req);
                        return;
                        // case "liked":
                        // req.body.activityData = {
                        //     event: "liked",
                        //     project_id: req.body.projectId,
                        //     user_id: req.user._id,
                        //     cohort_id:req.session.cohortId
                        // }

                        // activityController.create(req);
                        // return;
                        // case "favorited":
                        // req.body.activityData = {
                        //     event: "favorited",
                        //     project_id: req.body.projectId,
                        //     user_id: req.user._id,
                        //     cohort_id:req.session.cohortId
                        // }

                        // activityController.create(req);
                        // return;

                        
                    // case "recommend":
                    //     req.body.activityData = {
                    //         event: "is recommmended",
                    //         project_id: req.body.projectId,
                    //         user_id: req.user._id,
                    //         cohort_id:req.session.cohortId
                    //     }

                    //     activityController.create(req);
                    //     return;
                    // case "require":
                    //     req.body.activityData = {
                    //         event: "is required",
                    //         project_id: req.body.projectId,
                    //         user_id: req.user._id,
                    //         cohort_id:req.session.cohortId
                    //     }

                    //     activityController.create(req);
                    //     return;
                    // case "active":
                    //     req.body.activityData = {
                    //         event: "activated",
                    //         project_id: req.body.projectId,
                    //         user_id: req.user._id,
                    //         cohort_id:req.session.cohortId
                    //     }

                    //     activityController.create(req);
                    //     return;
                    // //Activity feed update for member status changes in relation to a particular project                        
                    // case "saved":
                    //     req.body.activityData = {
                    //         event: "user saved resource",
                    //         project_id: req.body.projectId, 
                    //         user_id: req.body.fav_user._id,
                    //         cohort_id:req.session.cohortId
                    //     }

                    //     activityController.create(req);
                    //     return;
                    // case "marked":
                    //     console.log("user completed resource");
                    //     req.body.activityData={
                    //         event:"user marked complete", 
                    //         project_id:req.body.projectId,
                    //         user_id:req.body.done_user._id,
                    //         cohort_id:req.session.cohortId
                    //     }

                    //     activityController.create(req);
                    //     return;
                    // case "liked":
                    //     console.log("user up voted");
                    //     req.body.activityData={
                    //         event:"upvoted the resource", 
                    //         project_id:req.body.projectId,
                    //         user_id:req.user._id,
                    //         cohort_id:req.session.cohortId
                    //     }

                    //     activityController.create(req);
                    //     return;
                    // case "disliked":
                    //     console.log("resource was disliked");
                    //     req.body.activityData={
                    //         event:"was down voted", 
                    //         project_id:req.body.projectId,
                    //         user_id:req.user._id,
                    //         cohort_id:req.session.cohortId
                    //     }

                    //     activityController.create(req);

                    
                    //     return;
                }
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },


    //Method to delete a Project
    close: (req, res) => {
        Project.update({
            _id: req.body.projectId
        }, {
            status: 'closed'
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.json(err)
        })
    }
}