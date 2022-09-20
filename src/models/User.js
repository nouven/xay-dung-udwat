import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  username:{
    type:String,
    unique:true,
  },
  password:{
    type:String,
  },
  email:{
    type:String,
    require: true,
    unique: true,
  },
  roles:{
    default:3,
    type:Number,
  }
})

const User = mongoose.model('users', userSchema)
export default User

