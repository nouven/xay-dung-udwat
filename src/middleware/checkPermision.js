export const isAdmin = (req, res, next) => {
  if (req.info.roles === 1) {
    next()
  } else {
    return res
      .status(403)
      .json({ message: 'you do not have permission for this!' })
  }
}
export const isSubadmin = (req, res, next) => {
  if (req.info.roles === 2) {
    next()
  } else {
    return res
      .status(403)
      .json({ message: 'you do not have permission for this!' })
  }
}
export const isUser = (req, res, next) => {
  if (req.info.roles === 3) {
    next()
  } else {
    return res
      .status(403)
      .json({ message: 'you do not have permission for this!' })
  }
}
