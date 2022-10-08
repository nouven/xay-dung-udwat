import { Router } from 'express'
import Survey from '../models/survey.model.js'

const router = Router()
router.get('/', (req, res) => {
  res.json({ message: 'survey route!!' })
})
router.post('/', (req, res) => {
  let { title } = req.body
  Survey({
    title,
  })
    .save()
    .then((result) => res.json(result))
    .catch((error) => res.json(error))
})
export default router
