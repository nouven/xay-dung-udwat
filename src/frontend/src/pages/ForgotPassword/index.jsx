import Input from '../../components/Input'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { forgotPassword } from '../../api'
export default function ForgotPassword() {
  let inputs = [
    {
      id: 1,
      label: 'Email',
      type: 'text',
      name: 'email',
      errorMsg: 'it should be a valid email address',
      required: true,
      pattern: '[0-9a-zA-Z]+[.]*[0-9a-zA-Z]+@[0-9a-zA-Z]+(.[0-9a-zA-Z]+)+',
    },
  ]
  let [value, setValue] = useState('')

  let handleChangeInput = (e) => {
    setValue(e.target.value)
  }

  let handleSubmit = () => {
    let regex = new RegExp(inputs[0].pattern)
    let isCheck = regex.test(value)
    if (!isCheck) {
      console.log('it should be a valid email address')
      return
    }
    forgotPassword({ email: value }).then((data) => {
      console.log(data)
    })
  }

  return (
    <div className='h-full w-screen flex justify-center items-center'>
      <div className='relative flex flex-col w-[500px] gap-2 px-4 rounded-md py-12 border border-black select-none'>
        <div className='absolute top-0 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 p-2 border border-black text-2xl font-bold bg-white'>
          Forgot Pasword
        </div>
        {inputs.map((input) => {
          let { id, label, errorMsg, ...others } = input
          return (
            <div key={id} className='flex'>
              <label className='w-[100px]'>{label}</label>
              <div className='flex flex-col flex-1'>
                <input
                  onChange={(e) => {
                    handleChangeInput(e)
                  }}
                  {...others}
                  value={value}
                  className=' px-1 py-1 border border-black outline-none text-lg peer rounded-md'
                />
                <div className='text-red-500 hidden peer-invalid:block'>
                  {errorMsg}
                </div>
              </div>
            </div>
          )
        })}
        <div className='flex justify-end gap-4'>
          <button
            onClick={() => handleSubmit()}
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
