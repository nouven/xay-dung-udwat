import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/user.route.js'
import authRoute from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    main()
  })
  .catch(error => console.log(error))



function main() {
  const app = express()
  app.use(express.json())

  app.use('/user', userRoute)
  app.use('/auth', authRoute)
  app.listen(process.env.PORT, () => {
    console.log(`app is runing!!`)
  })
}



