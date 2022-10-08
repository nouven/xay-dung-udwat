import { useState } from 'react'
import { IoIosCreate } from 'react-icons/io'
export default function NewSurvey() {
  let [title, setTitle] = useState('Title')
  let arr = [
    {
      id: 1,
      content: 'question 1',
      answers: [
        {
          id: 1,
          content: 'answer 1 - 1',
        },
        {
          id: 2,
          content: 'answer 1 - 2',
        },
      ],
    },
    {
      id: 2,
      content: 'question 2',
      answers: [
        {
          id: 1,
          content: 'answer 2 - 1',
        },
        {
          id: 2,
          content: 'answer 2 - 2 ',
        },
      ],
    },
  ]
  let [questions, setQuestion] = useState(arr)
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col gap-1 w-[500px] p-2 border'>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder='Enter title of survey'
          className='border'
        />
        <div className='flex justify-start items-end gap-2 text-2xl group cursor-pointer'>
          <IoIosCreate />
          <div className='text-sm hidden group-hover:block'>
            create question
          </div>
        </div>
        {questions.map((question) => {
          return 'hahkj'
        })}
      </div>
    </div>
  )
}
