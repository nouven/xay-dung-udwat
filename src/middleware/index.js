import jwt from 'jsonwebtoken'
export const verifyToken = (req, res, next) => {
  let token = req.headers.token.split(' ')[1]
  let info = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
  if (info) {
    req.info = info
    next()
  } else {
    return res.status(400).json({ message: 'token invalid!!' })
  }
}
