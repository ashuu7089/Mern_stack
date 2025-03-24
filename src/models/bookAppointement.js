const mongoose = require('mongoose')

const bookingAppointmentSchema =new mongoose.Schema({
    patientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    doctorId : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    date : {
        type : Date,
        required: true
    },
    status: { 
    type: String, 
    enum: ["booked", "cancelled"],
     default: "booked" 
    },

})

module.exports = mongoose.model('Appointment', bookingAppointmentSchema);
