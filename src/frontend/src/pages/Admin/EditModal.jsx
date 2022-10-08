import { useContext, useState } from 'react'
import { authContext } from '../../contexts/authContext'
import { MdOutlineCreate } from 'react-icons/md'
import { AiFillCloseCircle } from 'react-icons/ai'
import { updateInfo } from '../../api'

export default function EditModal({ info }) {
  let { setModal } = useContext(authContext)
  let [user, setUser] = useState(info)
  let [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  })
  let [display, setDisplay] = useState(0)
  let arr = [
    {
      id: 1,
      label: 'Username',
      value: user?.username,
      inputs: [
        {
          id: 1,
          required: true,
          name: 'username',
          placeholder: 'Username',
          pattern: 'nouven',
          errorMsg: 'error message',
        },
      ],
    },
    {
      id: 2,
      label: 'Email',
      value: user?.email,
      inputs: [
        {
          id: 1,
          required: true,
          name: 'email',
          placeholder: 'Email',
          pattern: '[a-z0-9]+@([a-z]+[.]+){1,2}[a-z]{2,3}',
          errorMsg: 'error message',
        },
      ],
    },
    {
      id: 3,
      label: 'Password',
      value: '',
      inputs: [
        {
          id: 1,
          required: true,
          name: 'password',
          placeholder: 'Password',
          pattern: 'nouven',
          errorMsg: 'error message',
        },
        {
          id: 2,
          required: true,
          name: 'confirmpassword',
          placeholder: 'Confirm password ',
          pattern: 'nouven',
          errorMsg: 'error message',
        },
      ],
    },
  ]

  const handleChangeInput = (e) => {
    setValues((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    })
  }
  const handleSave = ({ id }) => {
    let fieldname = 'username'
    if (id === 2) {
      fieldname = 'email'
    } else if (id === 3) {
      fieldname = 'password'
      if (values.password !== values.confirmpassword) {
        console.log('passwords does not match!')
        return
      }
    }
    let check = true
    if (!values[fieldname]) {
      console.log('This field cannot be left blank!')
      return
    }
    updateInfo({
      id: user._id,
      field: id,
      value: values[fieldname],
    }).then((data) => {
      if (id !== 3) {
        setUser((prev) => {
          return { ...prev, [fieldname]: values[fieldname] }
        })
      }
      setDisplay(0)
      console.log(data)
    })
  }
  let toggleModal = () => {
    setModal((prev) => {
      return { ...prev, toggle: false }
    })
  }
  return (
    <div className='relative flex flex-col gap-2 items-center w-[500px] py-4 bg-white'>
      <div
        onClick={() => toggleModal()}
        className='absolute -top-2 -right-2 text-red-500 bg-white rounded-full text-2xl cursor-pointer'
      >
        <AiFillCloseCircle />
      </div>
      {arr.map((item) => {
        let { id, label, value, inputs, ...others } = item
        return (
          <div
            key={id}
            className='flex gap-1 border p-2 w-[450px] lg:w-[600px]'
          >
            <div className='w-[100px]'>{label}</div>
            <div className='flex flex-col gap-2 flex-1 '>
              <div className='flex'>
                <div className='flex-1'>{`${value}`}</div>
                <button
                  onClick={() => {
                    setDisplay(id)
                  }}
                  className='flex justify-center items-center border p-1'
                >
                  <MdOutlineCreate />
                  change
                </button>
              </div>
              {display === id && (
                <div className='flex flex-col gap-1'>
                  <hr className='mb-4' />
                  {inputs.map((input) => {
                    let { errorMsg, ...others } = input
                    return (
                      <div key={input.id} className='flex flex-col'>
                        <input
                          onChange={(e) => handleChangeInput(e)}
                          {...others}
                          className='border px-1 peer'
                        />
                        <div className='hidden text-red-500 peer-invalid:block'>
                          {input.errorMsg}
                        </div>
                      </div>
                    )
                  })}
                  <div className='flex justify-end gap-2'>
                    <button
                      onClick={() => handleSave({ id })}
                      className='p-1 border'
                    >
                      save
                    </button>
                    <button
                      onClick={() => setDisplay(0)}
                      className='p-1 border'
                    >
                      cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
