import { useState, useContext, useEffect } from 'react'
import { authContext } from '../../contexts/authContext'
import { AiFillCloseCircle } from 'react-icons/ai'
import { getAllQuestionBySurveyid } from '../../api'
export default function SurveyDetailModal({ survey }) {
  let { setModal } = useContext(authContext)
  let [questions, setQuestions] = useState([])
  let handleCloseModal = () => {
    setModal({ toggle: false, modal: null })
  }
  useEffect(() => {
    getAllQuestionBySurveyid({ surveyid: survey._id }).then((data) => {
      setQuestions(data)
    })
  }, [])
  return (
    <div className='relative flex flex-col gap-2 px-1 w-[500px] py-4 bg-white'>
      <div
        onClick={() => handleCloseModal()}
        className='absolute -top-2 -right-2 rounded-full text-2xl text-red-500 cursor-pointer'
      >
        <AiFillCloseCircle />
      </div>
      <div className='flex justify-center p-2 '>
        {survey.title}&nbsp;- {survey.ownername}
      </div>
      {questions.map((question) => {
        return (
          <div key={question._id} className='flex justify-start p-2 border-b'>
            {question.content}
          </div>
        )
      })}
    </div>
  )
}
