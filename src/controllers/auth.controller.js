import User from '../models/User.js'
import bcrypt from 'bcrypt'
export default {
  register: async (req, res) => {
    let {username, password, email} = req.body
    let salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt);
    let user = User({
      username, password, email
    })
    User.find().then(result => res.json(result))
    //user.save()
    //  .then(result => res.json(result))
    //  .catch(error => res.json(error))
  },

  login: async (req, res) => {
    let {username , password } = req.body
    return res.status(200).json({username, password})
  }
}
