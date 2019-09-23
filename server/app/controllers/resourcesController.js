const Project = require('../models/Projects');
const activityController = require('../controllers/activityFeedController');
const Cohort = require('../models/Cohorts');
const User = require('../models/Users');
const Resource = require('../models/Resources');

module.exports = {

    //Method to return all Projects
    //populate from Cohorts Users 
    index: (req, res) => {
        Resource.find({})
            .populate('owner_id')
            .populate('cohort_id')
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
                    Resource.find({
                            cohort_id: cohortId,
                            $or: [{
                                students: userId
                            }, {
                                administrators: userId
                            }]
                        })
                        .populate('owner_id')
                        .populate('cohort_id')
                        .exec((err, data) => {
                            console.log('Resource data:', data)
                            res.json(data);
                        })
                } else {
                    console.log("invalid cohort or user")
                }
            })
            .catch(err => console.log('Resource data err:', err));
    },
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

                if (cohortId && userId) {
                    let query3 = Resource.find({
                            cohort_id: cohortId,
                            owner_id: userId
                        })
                        .count()

                    let query4 = Resource.find({
                            cohort_id: cohortId,
                            members: userId,
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
                    Resource.find({
                            cohort_id: cohortId,
                            owner_id: userId,
                            title:req.params.resource
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
    oneResource: (req, res) => {
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
                    // console.log("query variables inside if statement: ", cohortId, userId, req.params.resource)
                    Resource.find({
                            cohort_id: cohortId,
                            owner_id: userId,
                            title:req.params.resource
                        })
                        .populate('owner_id')
                        .populate('cohort_id', "name code isActive")
                        .populate('chat.author_id')
                        .exec((err, data) => {
                            // console.log('Project data:', data)
                            res.json(data);
                        })
                } else {
                    console.log("invalid cohort or user")
                }
            })
            .catch(err => console.log('Resource data err:', err));
    },
    //Method to create new Project
    create: (req, res) => {
        // console.log("inside the create project ORM");
        // console.log("req.user", req.user);
        // console.log("req.session", req.session);
        req.body.owner_id = req.user._id;
        req.body.cohort_id = req.session.cohortId;
        req.body.administrators = [req.user._id];
        Resource.create(req.body)
            .then(doc => {

                req.body.activityData = {
                    status: "active",
                    resource_id: doc._id, 
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

    //Method to update a Project 
    update: (req, res) => {
        // console.log("req.body: ", req.body);
        Resource.update({
                _id: req.body.resourceId
            }, req.body.update)
            .then(doc => {
                // console.log("req.body.update.status: ", req.body.update.status);
                // console.log("doc: ", doc);
                // console.log("req.user", req.user);
                switch (req.body.update.status||req.body.joinerStatus) {
                    //Activity feed update for project status change for a specific project
                    case "active":
                        req.body.activityData = {
                            event: "active",
                            resource_id: req.body.resourceId,
                            user_id: req.user._id,
                            cohort_id:req.session.cohortId
                        }

                        activityController.create(req);
                        return;
                    case "recommended":
                        req.body.activityData = {
                            event: "recommended",
                            resource_id: req.body.resourceId,
                            user_id: req.user._id,
                            cohort_id:req.session.cohortId
                        }

                        activityController.create(req);
                        return;
                    case "required":
                        req.body.activityData = {
                            event: "required",
                            resource_id: req.body.resourceId,
                            user_id: req.user._id,
                            cohort_id:req.session.cohortId
                        }

                        activityController.create(req);
                        return;
                    //Activity feed update for member status changes in relation to a particular project                        
                    // case "recommended":
                    //     req.body.activityData = {
                    //         event: "recommended",
                    //         resource_id: req.body.resourceId, 
                    //         user_id: req.body.studentId,
                    //         cohort_id:req.session.cohortId
                    //     }

                    //     activityController.create(req);
                    //     return;
                    // case "approved":
                    //     console.log("in the approval branch");
                    //     req.body.activityData={
                    //         event:"approved to join the project", 
                    //         project_id:req.body.projectId,
                    //         user_id:req.body.memberId,
                    //         cohort_id:req.session.cohortId
                    //     }

                    //     activityController.create(req);
                    //     return;
                    // case "declined":
                    //     console.log("in declined branch");
                    //     req.body.activityData={
                    //         event:"disapproved to join the project", 
                    //         project_id:req.body.projectId,
                    //         user_id:req.body.memberId,
                    //         cohort_id:req.session.cohortId
                    //     }

                    //     activityController.create(req);
                    //     return;
                    // case "ejected":
                    //     console.log("in the ejected branch");
                    //     req.body.activityData={
                    //         event:"was ejected from the project", 
                    //         project_id:req.body.projectId,
                    //         user_id:req.body.memberId,
                    //         cohort_id:req.session.cohortId
                    //     }

                        // activityController.create(req);
                        // return;
                }
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },

    //Method to disable a Resource
    disable: (req, res) => {
        Resource.update({
            _id: req.body.resourceId
        }, {
            status: 'disabled'
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.json(err)
        })
    }
}