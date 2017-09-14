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
    }
});
module.exports=mongoose.model('Activity_feed', ActivityFeedSchema);