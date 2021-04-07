const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true
    },
    password:{
        type : String,
        required:true
    },
    phone: {
        type: String,
        required: true,
    },
    valid:{
        type : Boolean,
        default : false
    },
    devise:{
        type : String,
        default:'USD'
    },
    address:{
        type : String,
        required:true
    },
})


const User = mongoose.model('User',userSchema)
module.exports = User