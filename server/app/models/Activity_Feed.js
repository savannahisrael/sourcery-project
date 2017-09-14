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
        ref:'Users',
        require:true
    },
    project_id:{
        type:Schema.ObjectId,
        ref:'Projects'
    }
});
module.exports=mongoose.model('Activity_feed', ActivityFeedSchema);