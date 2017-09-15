const Project = require('../models/Projects');
const activityController = require('../controllers/activityFeedController');

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
                switch (req.body.update.status){
                    case "in-progress":
                    
                    case "completed":
                    case "member joined project":
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