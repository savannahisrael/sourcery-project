const User = require('./models/Users.js');
const Project = require('./models/Projects.js');
const Cohorts = require('./models/Cohorts.js');
const Activities = require('./models/Activity_Feed.js');
const insertProjects = require('./insertData/insertProjects.json');
const insertUsers = require('./insertData/insertUsers.json');
const insertCohorts = require('./insertData/insertCohorts.json');
const insertActivity = require('./insertData/insertActivity.json');
const insertResources = require('./insertData/insertResources.json')
const Resources = require('./models/Resources.js');
const joins = require('./insertData/joins.json')

const _dropCollections = () => {
    Cohorts.collection.drop();
    User.collection.drop();
    Project.collection.drop();
    Activities.collection.drop();
    Resources.collection.drop();
}

module.exports = function (app) {

    app.get('/api/test/create', (req, res) => {
        _dropCollections();

        const newData = {"status" : "new data below"}

        

        Cohorts.create(insertCohorts)
        .then(cohorts => {
            console.log('Cohorts created:', cohorts.length)
            Object.assign(newData, {cohorts})

            return User.create(insertUsers)
        })
        
        .then(users => {
            console.log('Users created:',users.length)
            Object.assign(newData, {users})

        return Project.create(insertProjects.map(project => {
            projectJoin = joins.find(j => j.name === project.name)
            project.cohort_id = newData.cohorts.find(c => c.name === projectJoin.cohort)._id;
            project.owner_id = users.find(u => u.github.login === projectJoin.owner)._id
            project.fav_ = projectJoin.members.map(e => users.find(u => u.github.login === e)._id)
            project.pending_members = projectJoin.pending.map(e => users.find(u => u.github.login === e)._id)
            project.chat = projectJoin.chat.map(e => {
            e.author_id = users.find(u => u.github.login === e.author_id)._id;
                        return e
                    })
                    return project
                }))
            })
            .then(projects => {
                console.log('Projects created: ',projects.length)
                Object.assign(newData, {projects})
    
                return Activities.create(insertActivity.map(activity => {
                    activity.user_id = newData.users[Math.floor(Math.random()*newData.users.length)]._id
                    activity.project_id = newData.projects[Math.floor(Math.random()*newData.projects.length)]._id
                    return activity
                }))
            })
            .then(activities => {
                console.log('Activities created: ',activities.length)
                Object.assign(newData, {activities})
                
                return Resources.create(insertResources)
        })
        
        .then(resources => {
            console.log('Resources created:',resources.length)
            Object.assign(newData, {resources})
    
                res.json(newData)
            })
            .catch(err => console.log(err))
        })
};