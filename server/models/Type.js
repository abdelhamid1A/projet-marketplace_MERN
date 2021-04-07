const mongoose = require('mongoose')

const typeSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    price_for_upgrade:{
        type:Number,
        required:true
    }
})

const Type = mongoose.model('Type',typeSchema)
module.exports = Type