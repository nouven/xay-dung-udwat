import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

const generateToken = (payload, secretKey, expiresIn) => {
  return jwt.sign(payload, secretKey, { expiresIn })
}

const sendMail = async (payload, subject, to) => {
  let transpoter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.usermail,
      pass: process.env.passmail,
    }
  })
  let info = await transpoter.sendMail({
    from: process.env.usermail,
    to: to,
    subject: subject,
    html: payload,
  })
  console.log(info)
}

export { generateToken, sendMail }

