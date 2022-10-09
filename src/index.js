import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import surveyRoute from './routes/survey.route.js'
import questionRoute from './routes/question.route.js'

dotenv.config()

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    main()
  })
  .catch((error) => console.log(error))

function main() {
  const app = express()
  app.use(express.json())
  app.use(cors())

  app.use('/user', userRoute)
  app.use('/auth', authRoute)
  app.use('/survey', surveyRoute)
  app.use('/question', questionRoute)

  app.listen(process.env.PORT, () => {
    console.log(`app is runing!!`)
  })
}
