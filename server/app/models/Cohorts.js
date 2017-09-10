const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CohortSchema = new Schema({
    name:String,
    code:{
        type:String,
        unique:true,
        require:true
    },
    members:[{
        type:Schema.ObjectId,
        ref:'Users'
    }]
});
module.exports=mongoose.model('Cohort', CohortSchema);