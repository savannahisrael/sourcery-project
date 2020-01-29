const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// let UserSchema = new Schema({github:{}},{strict:false});
let UserSchema = new Schema({
    github: {
        login: String,
        name: String,
        id: Number,
        avatar_url: String
    },
    isActive:{
        type:Boolean, 
        default:true
    }
})
module.exports = mongoose.model('User', UserSchema);