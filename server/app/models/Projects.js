const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    summary: String,
    description: String,
    tech_tags: [],
    start_date: Date,
    duration: Number,
    members_wanted: {
        type: Number,
        require: true
    },
    google_drive_link: String,
    trello_link: String,
    repo_link: String,
    deploy_link: String,
    status:{
        type:String,
        default:'open'
    },
    owner_id: {
        type: Schema.ObjectId,
        ref: 'User',
        require: true
    },
    cohort_id: {
        type: Schema.ObjectId,
        ref: 'Cohort',
        require: true
    },
    pending_members: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    members: [{
        type: Schema.ObjectId,
        ref: 'User'
    }]
});
module.exports = mongoose.model('Project', ProjectSchema);