import { Schema, model } from 'mongoose'

let questionSchema = new Schema({
  surveyid: {
    type: String,
  },
  content: {
    type: String,
  },
})

export default model('questions', questionSchema)
