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
    members: [{
        type: Schema.ObjectId,
        ref: 'Users'
    }]
});
module.exports = mongoose.model('Cohort', CohortSchema);