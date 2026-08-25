const express = require('express');
const userController = require('../controller/user.controller')

const router = express.Router();


//  router.post('/register')
router.post('/register', userController.userRegisterController);


// router.post('/login', )
router.post('/login', userController.userLoginController);


// router.post('/logout')
router.post('/logout', userController.userLogoutController)



module.exports = router;    