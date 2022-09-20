import { useState } from "react"
import Input from "../components/Input"

export default function Register() {
  let [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmpw: '',
  })
  const inputs = [
    {
      id: 1,
      label: "Username",
      type: "text",
      name: "username",
      errorMsg: "error",
      required: true,
      pattern: 'nouven'
    },
    {
      id: 2,
      label: "Email",
      type: "text",
      name: "email",
      errorMsg: "error",
      required: true,
      pattern: 'nouven'
    },
    {
      id: 3,
      label: "Password",
      type: "password",
      name: "password",
      errorMsg: "error",
      required: true,
      pattern: 'nouven'
    },
    {
      id: 4,
      label: "Confirm pw",
      type: "text",
      name: "confirmpw",
      errorMsg: "confirm password",
      required: true,
      pattern: 'nouven'
    },
  ]
  let handleSubmit = () => {
    let isSubmit = true
    inputs.forEach(input => {
      if (!isSubmit) {
        return
      }
      let regex = new RegExp(input.pattern)
      isSubmit = regex.test(values[input.name])
    })
    console.log(isSubmit)
  }
  console.log(values)
  return (
    <div className="h-screen w-screen flex justify-center items-center">

      <div className="relative flex flex-col gap-2 px-4 py-12 border border-black select-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 border border-black text-2xl font-bold bg-white">Register</div>
        {inputs.map(input => {
          return (
            <Input key={input.id} props={input} fromParent={{ values, setValues }} />
          )
        })}
        <div className="flex justify-end gap-4">
          <button onClick={() => handleSubmit()} className="px-4 py-1 border border-black">login</button>
          <button className="px-4 py-1 border border-black">signup</button>
        </div>
      </div>
    </div>
  )
}
