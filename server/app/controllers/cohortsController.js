const Cohort = require('../models/Cohorts');

module.exports = {

    //Method to return all Cohorts
    index: (req, res) => {
        Cohort.find({})
            .populate('members')
            .then(doc => {
                res.json(doc)
            }).catch(err => {
                res.json(err)
            })
    },
    //Method to create new Cohort
    create: (req, res) => {
        Cohort.create(req.body)
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                res.json(err);
            });
    },
    //Method to update a Cohort 
    update: (req, res) => {
        console.log(req.body.update);
        let update = req.body.update;
        console.log(update);

        Cohort.update({
                _id: req.body.cohortId
            }, update)
            .then(doc => {
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },
    //Method to delete a Cohort
    deactivate: (req, res) => {
        Cohort.update({
            _id: req.body.cohortId
        }, {
            isActive: false
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.json(err)
        })
    }
}