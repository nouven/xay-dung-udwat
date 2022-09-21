import joi from 'joi'

export const registerValidate = (req , res, next) => {
  const schema = joi.object({
    username: joi.string().min(4).required(),
    email: joi.string().email().required(),
    password: joi.string().min(7).required(),
    confirmpass: joi.ref('password')
  })
  let result = schema.validate(req.body)
  if(result.error){
    return res.status(422).json(result.error.details[0].message)
  }else{
    next()
  }
}

export const loginValidate = (req, res, next) => {
  const schema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
  })
  let result = schema.validate(req.body)
  if(result.error){
    return res.status(422).json(result.error.details[0].message)
  }else{
    next()
  }
}

export const changePasswordValidate = (req, res, next) =>{
  let schema = joi.object({
    oldpassword: joi.string().required(),
    newpassword: joi.string().min(7).required(),
    confirmpassword: joi.ref('newpassword')
  })
  let result = schema.validate(req.body);
  if(result.error){
    return res.status(422).json(result.error.details[0].message)
  }else{
    next()
  }
}


