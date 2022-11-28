import { useState } from 'react'
import Input from '../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api'

export default function Register() {
  let navigate = useNavigate()
  let [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmpw: '',
  })
  const inputs = [
    {
      id: 1,
      label: 'Username',
      type: 'text',
      name: 'username',
      errorMsg:
        "Username should be 3-15 characters and shouldn't include any special character",
      required: true,
      pattern: '[a-zA-Z]{2,15}',
    },
    {
      id: 2,
      label: 'Email',
      type: 'text',
      name: 'email',
      errorMsg: 'it should be a valid email address',
      required: true,
      pattern: '[0-9a-zA-Z]+[.]*[0-9a-zA-Z]+@[0-9a-zA-Z]+(.[0-9a-zA-Z]+)+',
    },
    {
      id: 3,
      label: 'Password',
      type: 'password',
      name: 'password',
      required: true,
      pattern: 'qwe@123',
      errorMsg:
        'Password should be 7-20 characters and include at least 1 letter, 1 number and 1 special character!',
      pattern:
        '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,20}$',
    },
    {
      id: 4,
      label: 'Confirm pw',
      type: 'password',
      name: 'confirmpw',
      errorMsg: "Password don't match",
      required: true,
      pattern: 'qwe@123',
    },
  ]
  let handleSubmit = () => {
    let isSubmit = true
    inputs.forEach((input) => {
      if (!isSubmit) {
        return
      }
      let regex = new RegExp(input.pattern)
      isSubmit = regex.test(values[input.name])
    })
    if (isSubmit) {
      register({
        username: values.username,
        email: values.email,
        password: values.password,
        roles: 3,
      }).then((data) => {
        console.log(data)
        navigate('/login')
      })
    } else {
      console.log('miss pattern!!')
    }
  }
  return (
    <div className='h-full w-screen flex justify-center items-center'>
      <div className='relative flex flex-col w-[500px] gap-2 px-4 rounded-md py-12 border border-black select-none'>
        <div className='absolute top-0 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 p-2 border border-black text-2xl font-bold bg-white'>
          Register
        </div>
        {inputs.map((input) => {
          return (
            <Input
              key={input.id}
              props={input}
              fromParent={{ values, setValues }}
            />
          )
        })}
        <div className='flex justify-end gap-4'>
          <button
            onClick={() => handleSubmit()}
            className='px-4 py-1 border border-black rounded-md'
          >
            signup
          </button>
        </div>
        <div className='flex justify-end items-center '>
          you have already an account ? &nbsp;
          <Link className='underline' to='/login'>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
