import { Schema, model, Types } from 'mongoose'

let surveySchema = new Schema({
  title: {
    type: String,
  },
  ownerid: {
    type: String,
  },
  ownername: {
    type: String,
  },
  isconfirmed: {
    type: Boolean,
    default: false,
  },
})

export default model('surveys', surveySchema)
