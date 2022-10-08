import express from 'express'
import userController from '../controllers/user.controller.js'
import { verifyToken } from '../middleware/index.js'
import { isAdmin } from '../middleware/checkPermision.js'
const router = express.Router()

router.put('/:id', verifyToken, userController.updateInfo)
router.get('/', verifyToken, isAdmin, userController.getAllUser)
router.delete('/:id', verifyToken, isAdmin, userController.delete)

export default router
