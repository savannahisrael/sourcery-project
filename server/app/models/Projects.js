const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    summary: String,
    description: String,
    primary_language:{
        type:String,
        require: true
    },
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
    chat:[{
        body:String,
        date:{
            type:Date,
            default: Date.now
        },
        author_id:{
            type:Schema.ObjectId,
            ref:'User'
        },
        //public vs. private chats
        type: String
    }],
    //4 statuses: proposal, in-progress, completed, deleted
    status:{
        type:String,
        default:'proposal'
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