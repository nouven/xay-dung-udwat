import User from '../models/user.model.js'
import bcrypt from 'bcrypt'
export default {
  getAllUser: async (req, res) => {
    try {
      let users = await User.find(
        { roles: 2 },
        { username: 1, email: 1 }
      ).exec()
      return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  getUserById: async (req, res) => {
    try {
      let { id } = req.params.id
      let user = await User.findOne({ _id: id }, { username: 1, email: 1 })
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error)
    }
  },

  updateInfo: async (req, res) => {
    try {
      let { field, value } = req.body
      let _id = req.params.id
      let fieldname = 'username'
      if (field === 2) {
        fieldname = 'email'
      } else if (field === 3) {
        fieldname = 'password'
      }
      if (req.info._id !== _id && req.info.roles === 3) {
        return res.status(400).json({
          message: 'You do not have the right to change this information!',
        })
      }
      if (field === 3) {
        let salt = await bcrypt.genSalt(10)
        let hashPassword = await bcrypt.hash(value, salt)
        value = hashPassword
      }
      User.updateOne({ _id }, { [fieldname]: value }).exec()
      return res.status(200).json({ message: 'updated!' })
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  delete: async (req, res) => {
    let { id } = req.params
    User.deleteOne({ _id: id })
      .exec()
      .then(() => {
        return res.status(200).json({ message: 'deleted!' })
      })
      .catch((error) => {
        return res.status(500).json(error)
      })
  },
}
