const router = require("express").Router();

const appointment = require("../controllers/appointmentController");
const authMiddleware = require("../middlewares/authorization");


router.post("/", authMiddleware, appointment.createAppointmentAPI);
router.get("/", authMiddleware, appointment.getAppointments);
router.delete("/cancel/:id", authMiddleware, appointment.cancelAppointment);

module.exports = router;
