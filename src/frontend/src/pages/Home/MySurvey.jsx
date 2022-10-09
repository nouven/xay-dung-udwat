import { useContext, useEffect, useState } from 'react'
import { getAllUser } from '../../api'
import { authContext } from '../../contexts/authContext'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'
import { getAllSurveyByUserid, getAllQuestionBySurveyid } from '../../api'
import { BsCheckCircleFill } from 'react-icons/bs'
import SurveyDetailModal from './SurveyDetailModal'

export default function MySurvey() {
  let { modal, setModal } = useContext(authContext)
  let [surveys, setSurveys] = useState([])
  useEffect(() => {
    getAllSurveyByUserid().then((data) => {
      setSurveys(data)
    })
  }, [])
  let handleDetail = ({ survey }) => {
    setModal({ toggle: true, modal: <SurveyDetailModal survey={survey} /> })
  }
  return (
    <div className='flex justify-center py-4 h-full w-full '>
      <div className='flex flex-col gap-1 w-[500px] '>
        <div className='flex justify-center border'>My Surveys</div>
        {surveys.map((survey) => {
          return (
            <div
              key={survey._id}
              className='flex justify-between items-center p-1 border'
            >
              <div className='flex items-center gap-2 flex-1'>
                {survey.isconfirmed ? (
                  <BsCheckCircleFill className='text-green-500' />
                ) : (
                  <BsCheckCircleFill className='text-red-500' />
                )}
                <div>{survey.title}</div>
              </div>
              <div className='flex gap-2'>
                <button className='flex items-center gap-1 p-1 border'>
                  <AiFillEdit />
                  Edit
                </button>
                <button className='flex items-center gap-1 p-1 border'>
                  <AiTwotoneDelete />
                  <p>Delete</p>
                </button>
                <button
                  onClick={() => handleDetail({ survey })}
                  className='flex items-center gap-1 p-1 border'
                >
                  <BiDetail />
                  <p>Detail</p>
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
