const Project = require('../models/Projects');

module.exports = {

    //Method to return all Projects
    //**populate from Cohorts Users  
    
    //Method to create new Project
    create: (req, res) => {
        Project.create(req.body)
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                res.json(err);
            });
    },
    //Method to update a Project 
    update: (req, res) => {
        Project.update({
                _id: req.params.id
            }, req.body)
            .then(doc => {
                res.json(doc);
            }).catch(err => {
                res.json(err);
            })
    },
    //Method to delete a Project
    destroy: (req, res) => {
        Project.remove({
            _id: req.params.id
        }).then(doc => {
            res.json(doc);
        }).catch(err => {
            res.json(err)
        })
    }
}