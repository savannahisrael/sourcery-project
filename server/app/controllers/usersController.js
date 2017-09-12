const User = require('../models/Users');

module.exports = {

    //Method to return all Users
    

    //Method to create new User
    //include push to cohorts, Activity feed
    create: (req, res) => {
        User.create(req.body)
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                res.json(err);
            });
    },
    //Method to update an User 
    update: (req, res) => {
        User.update({
                _id: req.params.id
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
            _id: req.params.id
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.json(err)
        })
    }
}