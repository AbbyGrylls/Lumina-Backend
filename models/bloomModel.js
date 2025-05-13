const mongoose = require('mongoose')
const User= require('./userModel') 
const Schema = mongoose.Schema
const bloomSchema = new Schema({
    username: {
        type: String,
        required : true
    },
    userId:{type: mongoose.Schema.Types.ObjectId,ref:"User"},
    text: {
        type: String,
        required: true
    },
},{timestamps:true})
module.exports=mongoose.model('Bloom',bloomSchema)