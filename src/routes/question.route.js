import express from 'express'
import questionController from '../controllers/question.controller.js'
import { verifyToken } from '../middleware/index.js'
const router = express.Router()

router.get('/', verifyToken, questionController.getQuestionsBySurveyid)

export default router
