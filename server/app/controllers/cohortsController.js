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
        Cohort.update({
                _id: req.body.cohortId
            }, req.body.update)
            .then(doc => {
                // res.json(doc);
                console.log(doc);
            }).catch(err => {
                // res.json(err);
                console.log(doc);
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
    },

    verify: (req, res)=>{
        console.log("req: ",req.query);
        let cohortId = req.query.cohortCode || req.params.cohortId;
        Cohort.findOne({
            code: cohortId
        }).then(doc=>{
            console.log(doc)
            res.json(doc)
            return (doc)
        }).catch(err=>{
            console.log(err)
            res.json(doc)
        })
    }
}