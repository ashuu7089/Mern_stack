const router = require('express').Router();

const userRouter = require('../routers/userRouter');
const appointmentRouter = require('../routers/appointmentRouter');

router.use('/auth', userRouter);
router.use('/appointment', appointmentRouter);

module.exports = router;