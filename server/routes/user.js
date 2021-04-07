const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/signup',UserController.signUP)
router.get('/account/validate/:token',UserController.accountVerify)
router.post('/signin',UserController.signIn)

module.exports=router