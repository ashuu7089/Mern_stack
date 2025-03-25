const router = require('express').Router();
const multer = require('multer');
const upload = multer()
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authorization');

router.post('/register', upload.none(), userController.createUserRegisterAPI);
router.post('/login', upload.none(), userController.userLoginAPI);
router.get('/', authMiddleware, userController.getUsers);
router.get('/:id', userController.getPatientById);

module.exports = router;
