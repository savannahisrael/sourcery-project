const User = require('../models/Users');
const Cohort = require('../models/Cohorts');

module.exports = {

    //Method to return all Users
    index: (req, res) => {
        User.find({})
            .then(doc => {
                res.json(doc)
            }).catch(err => {
                res.json(err)
            })
    },

    //Method to create new User
    //include push to cohorts, Activity feed
    //Should be done through passport config no users should be added manually.
    // create: (req, res) => {
    //     User.create(req.body)
    //         .then(doc => {
    //             res.json(doc);
    //         })
    //         .catch(err => {
    //             res.json(err);
    //         });
    // },

    //Method to update an User 
    update: (req, res) => {
        User.update({
                _id: req.params.userId
            }, req.body)
            .then(doc => {
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },
    
    //Method to delete an User 
    //** add pull from cohorts
    destroy: (req, res) => {
        User.remove({
            _id: req.params.userId
        }).then(doc => {
            Cohort.update({
                '_id':req.params.cohortId
            },{
                $pull
            })
            res.json(doc);
        }).catch(err => {
            res.json(err)
        })
    }
}