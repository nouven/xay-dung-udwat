import { useEffect } from 'react'
import { useState } from 'react'

export default function Subadmin() {
  let [checked, setChecked] = useState()
  let inputs = [
    {
      id: 1,
      type: 'radio',
      name: 'Confirmed',
    },
    {
      id: 2,
      type: 'radio',
      name: 'Rejected',
    },
    {
      id: 3,
      type: 'radio',
      name: 'All',
    },
  ]
  useEffect(() => {
    console.log(checked)
  }, [checked])
  return (
    <div className='flex justify-center w-full h-full py-4'>
      <div className='flex flex-col w-[500px] border  py-2'>
        <div className='flex justify-end gap-6 mb-4'>
          {inputs.map((input) => {
            return (
              <div
                key={input.id}
                className='flex items-center gap-1 cursor-pointer text-xl '
              >
                <input
                  onChange={(e) => {
                    setChecked(input.id)
                  }}
                  checked={checked === input.id}
                  {...input}
                />
                <label htmlFor={input.id}>{input.name}</label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
