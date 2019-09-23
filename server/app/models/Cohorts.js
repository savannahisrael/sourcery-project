const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CohortSchema = new Schema({
    name: String,
    code: {
        type: String,
        unique: true,
        require: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    students: [{
        type: Schema.ObjectId,
        ref: 'User'
    }], 
    administrators:[{
        adminId:{
            type:Schema.ObjectId,
            ref: 'User'
        },
        role:{
            type: String
        },
        code: {
            type: String,
            unique: true,
            require: true
        }
    }]
});
module.exports = mongoose.model('Cohort', CohortSchema);