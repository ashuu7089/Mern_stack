const Appointment = require("../models/bookAppointement");

const createAppointmentAPI = async(req, res) => {
    try {
        const { doctorId, date } = req.body;
        const patientId = req.user.id;
    
        const appointment = new Appointment({ patientId, doctorId, date });
        await appointment.save();
        
       return res.status(201).json({status : true, message: "Appointment booked successfully" });
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message
        })
    }
}

const getAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.find({ status: "booked" }).populate("patientId doctorId", "userName email type");
        if(!appointments){
            return res.status(404).json({
                status : false,
                message : "appointment are not available"
            })
        }  
      return res.status(200).json({
        status : true, 
        message :"Appointment retrieved successfully..", 
        data:appointments
    });
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointments" });
    }
  };

  const cancelAppointment = async (req, res) => {
    try {
      const appointment = await Appointment.findById(req.params.id);
  
      if (!appointment || appointment.patientId.toString() !== req.user.id) {
        return res.status(403).json({
            status : false,
             message: "Not authorized to cancel this appointment"
             });
      }
  
      appointment.status = "cancelled";
      await appointment.save();
      return res.status(200).json({
        status : true,
         message: "Appointment cancelled"
        });
    } catch (error) {
        return res.status(500).json({
            status : false,
            message : error.message
        })
    }
  };

module.exports ={
    createAppointmentAPI,
    getAppointments,
    cancelAppointment
}
