import { useContext, useState } from 'react'
import Input from '../../components/Input'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api'
import { AiFillCloseCircle } from 'react-icons/ai'
import { authContext } from '../../contexts/authContext'

export default function NewUser() {
  let navigate = useNavigate()
  let { setModal } = useContext(authContext)
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
      errorMsg: 'error',
      required: true,
      pattern: '[a-zA-Z]{2,15}',
    },
    {
      id: 2,
      label: 'Email',
      type: 'text',
      name: 'email',
      errorMsg: 'error',
      required: true,
      pattern: '[0-9a-zA-Z]+@[0-9a-zA-Z]+(.[0-9a-zA-Z]+)+',
    },
    {
      id: 3,
      label: 'Password',
      type: 'password',
      name: 'password',
      errorMsg: 'error',
      required: true,
      pattern: 'qwe@123',
    },
    {
      id: 4,
      label: 'Confirm pw',
      type: 'text',
      name: 'confirmpw',
      errorMsg: 'confirm password',
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
        roles: 2,
      }).then((data) => {
        console.log(data)
      })
    } else {
      console.log('miss pattern!!')
    }
  }
  let handleCloseModal = () => {
    setModal((prev) => {
      return { toggle: false, modal: null }
    })
  }
  return (
    <div className='relative w-[500px] flex justify-center items-center bg-white py-4'>
      <div
        onClick={() => handleCloseModal()}
        className='absolute -top-2 -right-2 rounded-full text-2xl bg-white text-red-500 cursor-pointer'
      >
        <AiFillCloseCircle />
      </div>
      <div className='relative flex flex-col gap-2 px-2 select-none'>
        {inputs.map((input) => {
          return (
            <div key={input.id} className='border-b'>
              <Input props={input} fromParent={{ values, setValues }} />
            </div>
          )
        })}
        <div className='flex justify-end gap-4'>
          <button
            onClick={() => handleSubmit()}
            className='px-4 py-1 border border-black'
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
