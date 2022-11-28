import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { verifyTokenForgotPassword } from '../../api'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
export default function ForgotPassword2() {
  let params = useParams()
  let navigate = useNavigate()
  let [values, setValues] = useState({
    password: '',
    confirmpw: '',
  })
  useEffect(() => {
    localStorage.setItem('isForgotPassword', true)
  }, [])
  let handleSubmit = () => {
    verifyTokenForgotPassword({
      token: params.token,
      password: values.password,
    }).then((data) => {
      if (data.status === 200) {
        navigate('/login')
      } else {
        console.log(data)
      }
    })
  }
  let inputs = [
    {
      id: 1,
      label: 'Password',
      type: 'password',
      name: 'password',
      errorMsg: 'error',
      required: true,
      pattern: 'qwe@123',
    },
    {
      id: 2,
      label: 'Confirm pw',
      type: 'password',
      name: 'confirmpw',
      errorMsg: "Password don't match",
      required: true,
      pattern: 'qwe@123',
    },
  ]
  return (
    <div className='h-full w-screen flex justify-center items-center'>
      <div className='relative flex flex-col w-[500px] gap-2 px-4 rounded-md py-12 border border-black select-none'>
        <div className='absolute top-0 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 p-2 border border-black text-2xl font-bold bg-white'>
          Change Password
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
            onClick={() => {
              handleSubmit()
            }}
            className='px-4 py-1 border border-black rounded-md'
          >
            Submit
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
