const express = require('express')
const authController = require('../controllers/authController');
const middleware = require('../middlewares/middlewares');

const router = express.Router();

router.post('/signIn', authController.signIn)
router.post('/signUp', authController.signUp)
router.post('/isAuth', middleware.isUserLogged, authController.isAuth)

module.exports = router;