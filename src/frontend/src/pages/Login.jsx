import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { login, getInfo } from '../api'
import { authContext } from '../contexts/authContext'
export default function Login() {
  let { setCurrentUser } = useContext(authContext)
  let navigate = useNavigate()
  let [values, setValues] = useState({
    username: '',
    password: '',
  })
  let inputs = [
    {
      id: 1,
      label: 'Username',
      type: 'text',
      name: 'username',
      errorMsg: '',
      required: true,
      pattern: 'nouven',
    },
    {
      id: 2,
      label: 'Password',
      type: 'password',
      name: 'password',
      errorMsg: '',
      required: true,
      pattern: 'nouven',
    },
  ]
  let handleSubmit = () => {
    let isSubmit = true
    inputs.forEach((input) => {
      if (!isSubmit) {
        return
      }
      if (values[input.name] === '') {
        isSubmit = false
      }
    })
    if (isSubmit) {
      login({ username: values.username, password: values.password }).then(
        (data) => {
          localStorage.setItem('token', data.token)
          getInfo()
            .then((data) => {
              let info = data
              setCurrentUser({ ...info })
              if (info?.roles == 1) {
                navigate('/admin')
              } else if (info?.roles == 2) {
                navigate('/subadmin')
              } else {
                navigate('/')
              }
            })
            .catch((error) => {
              console.log(error)
            })
        }
      )
    }
  }
  return (
    <div className='flex justify-center items-center h-full '>
      <div className='relative flex flex-col rounded-md gap-2 px-4 py-12 border border-black select-none'>
        <div className='absolute rounded-md top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 border border-black text-2xl font-bold bg-white'>
          Login
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
        <div className='flex justify-end gap-4 '>
          <button
            onClick={() => handleSubmit()}
            className='px-4 py-1 border border-black rounded-md'
          >
            login
          </button>
        </div>
        <div className='flex flex-col items-end gap-2 pt-3'>
          <button className='underline hover:text-red-500'>
            forgot password?
          </button>
          <button className=''>
            create new account ?
            <Link className='underline hover:text-red-500' to='/register'>
              &nbsp; Signup
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
