import express from 'express'
import userController from '../controllers/user.controller.js'
const router = express.Router()

router.put('/:id', (req, res) => {
  return res.json(req.body)
})



export default router
