const Activity = require('../models/Activity_Feed');

module.exports = {

    //Method to return all Activities
    //**populate data from Users and Projects
    index: (req, res) => {
        Activity.find({})
            .populate('Users')
            .populate('Cohorts')
            .then(doc => {
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },

    //Method to create new Activity
    create: (req, res) => {
        Activity.create(req.body)
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                res.json(err);
            });
    },
    //Method to update an Activity 
    update: (req, res) => {
        Activity.update({
                _id: req.params.id
            }, req.body)
            .then(doc => {
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },
    //Method to delete an Activity
    destroy: (req, res) => {
        Activity.remove({
            _id: req.params.id
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.json(err)
        })
    }
}