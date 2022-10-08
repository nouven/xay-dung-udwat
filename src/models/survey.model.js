import { Schema, model, Types } from 'mongoose'

let surveySchema = new Schema({
  title: {
    type: String,
  },
  participant: {
    type: Number,
    default: 0,
  },
})

export default model('surveys', surveySchema)
