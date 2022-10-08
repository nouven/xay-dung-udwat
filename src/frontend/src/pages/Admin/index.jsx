import { useContext, useEffect, useState } from 'react'
import { getAllUser } from '../../api'
import { authContext } from '../../contexts/authContext'
import EditModal from './EditModal'
import NewUser from './NewUser'
import { HiOutlineUserAdd } from 'react-icons/hi'
import { AiFillEdit, AiTwotoneDelete } from 'react-icons/ai'
import { BiDetail } from 'react-icons/bi'
import { deleteUser } from '../../api'

export default function Admin() {
  let { modal, setModal } = useContext(authContext)
  let [users, setUsers] = useState([])
  useEffect(() => {
    getAllUser().then((data) => setUsers(data))
  }, [])
  let handleEdit = (user) => {
    setModal({
      toggle: true,
      modal: <EditModal info={user} />,
    })
  }
  let handleNewUser = () => {
    setModal({
      toggle: true,
      modal: <NewUser />,
    })
  }
  let handleDelete = (user) => {
    let id = user._id
    deleteUser({ id })
    setUsers((prev) => {
      return users.filter((user) => {
        return user._id !== id
      })
    })
  }
  return (
    <div className='flex justify-center py-4 h-full w-full '>
      <div className='flex flex-col gap-1 w-[500px] '>
        <div className='flex justify-center border'>Employee</div>
        <div className='flex justify-end border'>
          <button
            onClick={() => handleNewUser()}
            className='flex items-center gap-1 p-1 border'
          >
            <HiOutlineUserAdd />
            <p>New user</p>
          </button>
        </div>
        {users.map((user) => {
          return (
            <div
              key={user._id}
              className='flex justify-between items-center p-1 border'
            >
              <div className='flex-1'>{user.username}</div>
              <div className='flex gap-2'>
                <button
                  onClick={() => handleEdit(user)}
                  className='flex items-center gap-1 p-1 border'
                >
                  <AiFillEdit />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user)}
                  className='flex items-center gap-1 p-1 border'
                >
                  <AiTwotoneDelete />
                  <p>Delete</p>
                </button>
                <button className='flex items-center gap-1 p-1 border'>
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
