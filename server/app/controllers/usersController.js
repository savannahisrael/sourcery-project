const User = require('../models/Users');
const Cohort = require('../models/Cohorts');

module.exports = {

    //Method to return all Users for a specific status
    index: (req, res) => {
        // console.log("inside user index");
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
    //Refer to config/passport.js

    //Method to update an User 
    update: (req, res) => {
        User.update({
                _id: req.body.userId
            }, req.body.update)
            .then(doc => {
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },

    //Method to deactivate an User 
    deactivate: (req, res) => {
        User.update({
                _id: req.body.userId
            }, {
                isActive: false
            })
            .then(doc => {
                res.json(doc);
            }).catch(err => {
                res.json(err)
            })
    }
}