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
    //Method to get one Cohort
    oneCohort:(req, res)=>{
        // console.log("inside ORM: ", req.params);
        Cohort.find({
            code:req.params.cohortCode
        })
        .populate('members')
        .populate('projects')
        .then(doc =>{
            res.json(doc);
        })
        .catch(err =>{
            res.json(err);
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
    //Method to verify Cohort
    verify: (req, res)=>{
        let cohortId = req.query.cohortCode || req.params.cohortId; 
        return Cohort.findOne({
            code: cohortId
        }).then(doc=>{
            return doc
        }).catch(err=>{
            console.log("error:", err)
            res.json(err)
        })
    },
    //Method to verify if user exists in cohort member list
    verifyMember: (req, res)=>{
        // console.log("req.user in verify member: ",req.user);
        return Cohort.findOne({
            members: req.user._id
        })
        .populate('members')
        .populate('projects')
        .then(doc=>{
            // console.log("doc", doc);
            return doc
        }).catch(err => {
            res.json(err)
        })
    }
}