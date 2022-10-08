import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils/index.js'
export default {
  register: async (req, res) => {
    let { username, password, email, roles } = req.body
    console.log(req.body)

    let salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)
    let user = new User({
      username,
      password,
      email,
      roles,
    })
    user
      .save()
      .then((result) => res.status(200).json(result))
      .catch((error) => {
        res.status(500).json(error)
      })
  },

  login: async (req, res) => {
    try {
      let user = await User.findOne({ username: req.body.username })
      if (!user) {
        return res.status(404).json({ message: 'user not exist!!' })
      }
      let { _id, username, password, email, roles } = user
      let check = await bcrypt.compare(req.body.password, password)
      if (!check) {
        return res
          .status(400)
          .json({ message: 'username or password is incorrected!!' })
      }
      let token = generateToken(
        { _id, username, roles, email },
        process.env.ACCESS_TOKEN_KEY,
        '3h'
      )
      return res.status(200).json({ token })
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  changePassword: async (req, res) => {
    let { _id, username } = req.info
    let { oldpassword, newpassword } = req.body
    try {
      let user = await User.findOne({ _id })
      console.log(user)
      let check = await bcrypt.compare(oldpassword, user.password)
      if (check) {
        let salt = await bcrypt.genSalt(10)
        let password = await bcrypt.hash(newpassword, salt)
        User.updateOne({ _id }, { password }).exec()
        return res.status(200).json({ message: 'successfully!!' })
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  getInfo: async (req, res) => {
    try {
      let { _id } = req.info
      let user = await User.findOne(
        { _id },
        { username: 1, email: 1, roles: 1 }
      )
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
}
