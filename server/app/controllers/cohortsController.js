const Cohort = require('../models/Cohorts');

module.exports = {

    //Method to return all Cohorts
    index: (req, res) => {
        Cohort.find({})
            .populate('Users')
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
        Cohort.update({
                _id: req.params.id
            }, req.body)
            .then(doc => {
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },
    //Method to delete a Cohort
    destroy: (req, res) => {
        Cohort.remove({
            _id: req.params.id
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.json(err)
        })
    }
}