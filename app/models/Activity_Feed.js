const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ActivityFeedSchema = new Schema({
    event:String,
    visible:{
        type:Boolean,
        default:true
    },
    user_id:{
        type:Schema.ObjectId,
        ref:'User',
        require:true
    },
    project_id:{
        type:Schema.ObjectId,
        ref:'Project'
    }, 
    resource_id:{
        type:Schema.ObjectId,
        ref: 'Resource'
    },
    cohort_id:{
        type:Schema.ObjectId, 
        ref:'Cohort'
    }
});
module.exports=mongoose.model('Activity_feed', ActivityFeedSchema);