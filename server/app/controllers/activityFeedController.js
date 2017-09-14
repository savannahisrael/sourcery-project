const Activity = require('../models/Activity_Feed');

module.exports = {

    //Method to return all Activities
    //**populate data from Users and Projects
    index: (req, res) => {
        console.log("inside index of activity");
        Activity.find({})
            .populate('user_id')
            .populate('project_id')
            .then(doc => {
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },

    //Method to create new Activity
    create: (req, res) => {
        Activity.create(req.body.activityData)
            .then(doc => {
                // res.json(doc);
                console.log("done");
            })
            .catch(err => {
                // res.json(err);
                console.log(err);
            });
    },
    //Method to update an Activity 
    update: (req, res) => {
        console.log("inside activity update");
        Activity.update({
                _id: req.body.activityId
            }, req.body.update)
            .then(doc => {
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },
    //Method to delete an Activity
    hide: (req, res) => {
        Activity.update({
            _id: req.body.activityId
        },{
            visible:false
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.json(err)
        })
    }
}