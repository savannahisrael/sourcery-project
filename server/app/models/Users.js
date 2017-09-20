const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// let UserSchema = new Schema({github:{}},{strict:false});
let UserSchema = new Schema({
    github: {
        login: String,
        name: String,
        id: Number
    },
    isActive:{
        type:Boolean, 
        default:true
    }, 
    projects:[{
    	type: Schema.ObjectId, 
    	ref:'Project'
    }]
})
module.exports = mongoose.model('User', UserSchema);