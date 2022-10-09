import { useEffect, useState } from 'react'
import { IoIosCreate } from 'react-icons/io'
import { AiOutlineSave } from 'react-icons/ai'
import { RiDeleteBack2Fill } from 'react-icons/ri'
import { getAllSurveyByUserid, createSurvey } from '../../api'
export default function NewSurvey() {
  let [title, setTitle] = useState('Title')
  let arr = [
    {
      id: 1,
      content: 'question 1',
    },
    {
      id: 2,
      content: 'question 2',
    },
  ]
  useEffect(() => {
    getAllSurveyByUserid()
  }, [])
  let [questions, setQuestions] = useState(arr)
  let handleNewQuestion = () => {
    let id = questions.length + 1
    let content = ''
    setQuestions((prev) => {
      return [...prev, { id, content }]
    })
  }
  let handleChangeQuestionInput = ({ e, id }) => {
    setQuestions(() => {
      return questions.map((question) => {
        if (question.id === id) {
          question.content = e.target.value
        }
        return question
      })
    })
  }
  let handleDeleteQuestion = ({ id }) => {
    setQuestions(() => {
      return questions.filter((question) => {
        return question.id !== id
      })
    })
  }
  let handleSave = () => {
    createSurvey({ title, questions })
  }
  return (
    <div className='flex justify-center h-full '>
      <div className='flex flex-col gap-2 w-[500px] h-full  p-2 border overflow-auto'>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder='Enter title of survey'
          className='border px-1 py-2'
        />
        <div
          onClick={() => handleNewQuestion()}
          className='flex justify-start items-center gap-1 py-2 text-2xl group cursor-pointer'
        >
          <IoIosCreate />
          <div className='text-sm hidden group-hover:block'>
            create question
          </div>
        </div>
        <div className='flex gap-2 flex-col-reverse'>
          {questions.map((question) => {
            return (
              <div key={question.id} className='flex items-center gap-1'>
                <input
                  onChange={(e) =>
                    handleChangeQuestionInput({ e, id: question.id })
                  }
                  value={
                    questions.find((item) => item.id === question.id).content
                  }
                  placeholder='Your question'
                  className='border px-1 py-2 flex-1'
                />
                <RiDeleteBack2Fill
                  onClick={() => handleDeleteQuestion({ id: question.id })}
                  className='text-2xl rounded-full hover:text-red-500 cursor-pointer'
                />
              </div>
            )
          })}
        </div>
        <div className='flex justify-end'>
          <button
            onClick={() => handleSave()}
            className=' flex items-center gap-1 border py-1 px-2 hover:bg-gray-300'
          >
            <AiOutlineSave className='text-2xl' />
            <p>Save</p>
          </button>
        </div>
      </div>
    </div>
  )
}
