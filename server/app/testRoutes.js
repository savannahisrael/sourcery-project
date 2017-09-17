const User = require('./models/Users.js');
const Project = require('./models/Projects.js');
const Cohorts = require('./models/Cohorts.js');
const Activities = require('./models/Activity_Feed.js');
const sampleProjects = require('../../src/utils/sampleData/sampleProjects.json');
const sampleUsers = require('../../src/utils/sampleData/sampleUsers.json');
const sampleCohorts = require('../../src/utils/sampleData/sampleCohorts.json');
const sampleActivities = require('../../src/utils/sampleData/sampleActivity.json');
const joins = require('../../src/utils/sampleData/joins.json')

const _dropCollections = () => {
    Cohorts.collection.drop();
    User.collection.drop();
    Project.collection.drop();
    Activities.collection.drop();
}

module.exports = function (app) {

    app.get('/api/test/create', (req, res) => {
        _dropCollections();

        const newData = {"status" : "new data below"}

        Cohorts.create(sampleCohorts)
        .then(cohorts => {
            console.log('Cohorts created:', cohorts.length)
            Object.assign(newData, {cohorts})

            return User.create(sampleUsers)
        })
        .then(users => {
            console.log('Users created:',users.length)
            Object.assign(newData, {users})

            return Project.create(sampleProjects.map(project => {
                projectJoin = joins.find(j => j.name === project.name)
                project.cohort_id = newData.cohorts.find(c => c.name === projectJoin.cohort)._id;
                project.owner_id = users.find(u => u.github.login === projectJoin.owner)._id
                project.members = projectJoin.members.map(e => users.find(u => u.github.login === e)._id)
                project.pending_members = projectJoin.pending.map(e => users.find(u => u.github.login === e)._id)
                return project
            }))
        })
        .then(projects => {
            console.log('Projects created: ',projects.length)
            Object.assign(newData, {projects})

            return Activities.create(sampleActivities.map(activity => {
                activity.user_id = newData.users[Math.floor(Math.random()*newData.users.length)]._id
                activity.project_id = newData.projects[Math.floor(Math.random()*newData.projects.length)]._id
                return activity
            }))
        })
        .then(activities => {
            console.log('Activities created: ',activities.length)
            Object.assign(newData, {activities})

            res.json(newData)
        })
        .catch(err => console.log(err))
    })
};