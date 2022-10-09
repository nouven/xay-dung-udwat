import Survey from '../models/survey.model.js'
import Question from '../models/question.model.js'
export default {
  createSurvey: async (req, res) => {
    try {
      let { title, questions } = req.body
      let survey = await Survey({
        title,
        ownerid: req.info._id,
        ownername: req.info.username,
      }).save()
      questions.map((question) => {
        Question({
          surveyid: survey._id,
          content: question.content,
        }).save()
      })
      return res.status(200).json({ message: 'created!' })
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  getAllSurvey: async (req, res) => {
    try {
      let surveys = await Survey.find().limit(5)
      return res.status(200).json(surveys)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  getAllSurveyByUserid: async (req, res) => {
    try {
      let surveys = await Survey.find({ ownerid: req.info._id })
      return res.status(200).json(surveys)
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  confirmSurvey: async (req, res) => {
    try {
      let { id } = req.body
      Survey.updateOne({ _id: id }, { isconfirmed: true }).exec()
      return res.status(200).json({ message: 'updated!!' })
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  searchSurvey: async (req, res) => {
    try {
      let { value, checked } = req.query
      let surveys = []
      if (!value) {
        if (!checked) {
          surveys = await Survey.find().limit(7)
        } else {
          surveys = await Survey.find({ isconfirmed: checked })
        }
      } else {
        if (!checked) {
          surveys = await Survey.find({
            ownername: { $regex: '.*' + value + '.*' },
          }).limit(7)
        } else {
          surveys = await Survey.find({
            isconfirmed: checked,
            ownername: { $regex: '.*' + value + '.*' },
          }).limit(7)
        }
      }
      return res.status(200).json(surveys)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
}
