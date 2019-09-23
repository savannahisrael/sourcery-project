const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ResourceSchema = new Schema({
    fileType: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    description: String,
    primary_language:{
        type:String,
        require: true
    },
    tech_tags: [],
    url: {
        type: String,
        require: true
    },
    embedded_url: String,
    s3_url: String,
    upvotes: {
        type: Number
    },
    downvotes: {
        type: Number
    },
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
        //public chat vs. private notes
        chat_type: String
    }],
    //4 statuses: recommended, required, active, disabled
    //set by admin
    status:{
        type:String,
        default:'active'
    },
    //admin who posted or approved
    owner_id: {
        type: Schema.ObjectId,
        ref: 'User',
        require: true
    },
    cohort_id: [{
        type: Schema.ObjectId,
        ref: 'Cohort',
        require: true
    }],
  
});
module.exports = mongoose.model('Resource', ResourceSchema);