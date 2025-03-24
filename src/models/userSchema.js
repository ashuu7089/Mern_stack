const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    userName : {
        type : String,
        require: true
    },
    email : {
        type : String,
        require: true
    },
    password  : {
        type : String,
        require : [true, "Password are required"]
    },
    type:{
        type : String,
        enum: ['patient', 'doctor'], // patient or doctor
        default: 'patient'
    },
    isActive : {
        type : Boolean
    }

})

module.exports = mongoose.model('User', userSchema);
