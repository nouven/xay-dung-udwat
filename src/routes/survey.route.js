import { Router } from 'express'
import surveyController from '../controllers/survey.controller.js'
import { verifyToken } from '../middleware/index.js'

const router = Router()

router.post('/', verifyToken, surveyController.createSurvey)
router.get('/', verifyToken, surveyController.getAllSurvey)
router.put('/', verifyToken, surveyController.confirmSurvey)
router.get('/by_userid', verifyToken, surveyController.getAllSurveyByUserid)
router.get('/search', verifyToken, surveyController.searchSurvey)

export default router
