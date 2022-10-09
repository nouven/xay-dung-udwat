import { useState, useContext, useEffect } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'
import {
  getAllSurvey,
  getAllQuestionBySurveyid,
  searchSurvey,
  confirmSurvey,
} from '../../api'
import { authContext } from '../../contexts/authContext'
import { BsCheckCircleFill } from 'react-icons/bs'
import SurveyDetailModal from '../Home/SurveyDetailModal'

export default function Subadmin() {
  let [checked, setChecked] = useState(3)
  let { modal, setModal } = useContext(authContext)
  let [surveys, setSurveys] = useState([])
  let [search, setSearch] = useState('')
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
    if (checked === 1) {
      checked = true
    } else if (checked === 2) {
      checked = false
    } else {
      checked = null
    }
    searchSurvey({ value: search, checked }).then((data) => {
      setSurveys(data)
    })
  }, [search, checked])
  useEffect(() => {
    getAllSurvey().then((data) => {
      setSurveys(data)
    })
  }, [])
  let handleDetail = ({ survey }) => {
    setModal({ toggle: true, modal: <SurveyDetailModal survey={survey} /> })
  }
  let handleSearch = (e) => {
    setSearch(e.target.value)
  }
  let handleConfirm = ({ id }) => {
    confirmSurvey({ id }).then((data) => {
      console.log(data)
    })
  }
  return (
    <div className='flex justify-center w-full h-full py-4'>
      <div className='flex flex-col gap-1 w-[500px] border  px-1 py-2'>
        <div className='flex justify-end gap-6 mb-4'>
          {inputs.map((input) => {
            return (
              <div
                key={input.id}
                className='flex items-center gap-1 rounded-md p-2 hover:bg-gray-200'
              >
                <input
                  onChange={(e) => {
                    setChecked(input.id)
                  }}
                  checked={checked === input.id}
                  {...input}
                />
                <label className='cursor-pointer' htmlFor={input.id}>
                  {input.name}
                </label>
              </div>
            )
          })}
        </div>
        <div className='flex items-center border p-1'>
          <AiOutlineSearch className='text-2xl' />
          <input
            onChange={(e) => handleSearch(e)}
            value={search}
            className='outline-none pl-1 flex-1 text-lg'
            placeholder='Search ...'
            type='text'
          />
        </div>
        <div className='border'>
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
                  {!survey.isconfirmed && (
                    <button
                      onClick={() => handleConfirm({ id: survey._id })}
                      className='flex items-center gap-1 p-1 border'
                    >
                      <BsCheckCircleFill />
                      Confirm
                    </button>
                  )}
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
    </div>
  )
}
