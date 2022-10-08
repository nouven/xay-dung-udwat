import { Schema, model } from 'mongoose'

let answerSchema = new Schema({
  questionid: {
    type: String,
  },
  content: {
    type: String,
  },
})
