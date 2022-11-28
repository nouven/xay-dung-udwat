import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getInfo } from '../api'
import EditModal from '../pages/Admin/EditModal'

const authContext = createContext()

export default function AuthContextProvider({ children }) {
  let [currentUser, setCurrentUser] = useState({})
  let [modal, setModal] = useState({ toggle: false, modal: null })
  let navigate = useNavigate()
  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = () => {
    let token = localStorage.getItem('token')
    let isForgotPassword = localStorage.getItem('isForgotPassword')
    if (isForgotPassword) {
      localStorage.removeItem('isForgotPassword')
      return
    }
    if (!token) {
      navigate('/login')
    } else {
      getInfo()
        .then((data) => {
          let info = data
          setCurrentUser({ ...info })
          if (info?.roles === 1) {
            navigate('/admin')
          } else if (info?.roles === 2) {
            navigate('/subadmin')
          } else {
            navigate('/setting')
          }
        })
        .catch((error) => {
          navigate('/login')
        })
    }
  }
  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  const value = {
    logout,
    currentUser,
    setCurrentUser,
    modal,
    setModal,
  }
  return <authContext.Provider value={value}>{children}</authContext.Provider>
}
export { authContext }
