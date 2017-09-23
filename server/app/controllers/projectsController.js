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
            .populate('pending_members')
            .populate('members')
            .exec((err, data) => {
                if (err) {
                    res.json(err)
                };
                res.json(data)
            })
    },

    //Method to get projects for specific cohort and user
    dashboardCohort: (req, res) => {

        req.params.cohort = '0417';
        req.params.username = "fahad";

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
                        // members: userId
                        pending_members:userId
                    })
                    .populate('owner_id')
                    .populate('cohort_id')
                    .populate('pending_members')
                    .populate('members')
                    .exec((err, data)=>{
                        res.json(data);
                    })
                } else {
                    console.log("invalid cohort or user")
                }
            })

    },

    //Method to create new Project
    create: (req, res) => {
        Project.create(req.body)
            .then(doc => {

                req.body.activityData = {
                    event: "proposal",
                    project_id: doc._id
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
        Project.update({
                _id: req.body.projectId
            }, req.body.update)
            .then(doc => {
                switch (req.body.update.status) {
                    case "in-progress":
                        req.body.activityData = {
                            event: "in-progress",
                            project_id: doc._id
                        }

                        activityController.create(req);
                        return;
                    case "completed":
                        req.body.activityData = {
                            event: "completed",
                            project_id: doc._id
                        }

                        activityController.create(req);
                        return;
                    case "member joined project":
                        req.body.activityData = {
                            event: "member joined project",
                            project_id: doc._id
                        }

                        activityController.create(req);
                        return;
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