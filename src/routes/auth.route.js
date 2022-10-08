
import express from 'express'
import userController from '../controllers/user.controller.js'
import authController from '../controllers/auth.controller.js'
import {verifyToken} from '../middleware/index.js'
import {registerValidate, loginValidate, changePasswordValidate}  from '../middleware/validate.js'
const router = express.Router()

router.post('/register',registerValidate, authController.register)
router.post('/login',loginValidate, authController.login)
router.post('/info',verifyToken, authController.getInfo)
router.post('/reset-password',loginValidate, authController.login)
router.post('/change-password',verifyToken,changePasswordValidate, authController.changePassword)

export default router
