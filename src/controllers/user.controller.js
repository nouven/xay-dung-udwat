import User from '../models/User.js'
export default {
  register: (req, res) => {
    let { username } = req.body
    User({ username }).save().then(user => res.json(user))
  },
  login: (req, res) => {
    let {username , password } = req.body
    return res.status(200).json({username, password})
  }
}
