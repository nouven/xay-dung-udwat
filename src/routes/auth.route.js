
import express from 'express'
import userController from '../controllers/user.controller.js'
import authController from '../controllers/auth.controller.js'
import {registerValidate, loginValidate}  from '../middleware/validate.js'
const router = express.Router()

router.post('/register',registerValidate, authController.register)
router.post('/login',loginValidate, authController.login)



export default router
