import Question from '../models/question.model.js'
export default {
  getQuestionsBySurveyid: async (req, res) => {
    try {
      let { surveyid } = req.query
      let questions = await Question.find({ surveyid })
      return res.status(200).json(questions)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
}
