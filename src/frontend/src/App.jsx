import { useContext } from 'react'
import {
  Navigate,
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import AuthContextProvider, { authContext } from './contexts/authContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import Home from './pages/Home'
import NewSurvey from './pages/Home/NewSurvey'
import MySurvey from './pages/Home/MySurvey'
import Setting from './pages/Home/Setting'
import BadPage from './pages/Badpage'
import Subadmin from './pages/Subadmin'
import { FiLogOut } from 'react-icons/fi'
import ForgotPassword from './pages/ForgotPassword'
import ForgotPassword2 from './pages/ForgotPassword/ForgotPassword2'

export default function App() {
  let { currentUser, modal, setModal, logout } = useContext(authContext)
  const ProtectedRoute = ({ children, role }) => {
    if (Object.keys(currentUser).length === 0) {
      return
      //return <Navigate to="/login" />
    } else {
      if (role === currentUser.roles) {
        return children
      } else {
        return (
          <div className='flex justify-center mt-12 text-2xl'>
            you are not allowed to access this page!!
          </div>
        )
      }
    }
  }
  const Profile = ({ children }) => {
    return (
      <div className='relative flex flex-col h-screen w-screen'>
        {modal.toggle && (
          <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-60'>
            {modal.modal}
          </div>
        )}
        <div className='flex justify-center py-2 items-center gap-4 border pr-12 text-xl'>
          <p>Đỗ Quý Nguyễn</p>
          <p>AT150542</p>
          <FiLogOut onClick={logout} className='cursor-pointer' />
        </div>
        <div className='flex-1'>{children}</div>
      </div>
    )
  }
  return (
    <Profile>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/forgot-password/:token' element={<ForgotPassword2 />} />
        <Route path='*' element={<BadPage />} />
        <Route
          path='/admin'
          element={
            <ProtectedRoute role={1}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path='/subadmin'
          element={
            <ProtectedRoute role={2}>
              <Subadmin />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={
            <ProtectedRoute role={3}>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route path='create-survey' element={<NewSurvey />} />
          <Route path='my-surveys' element={<MySurvey />} />
          <Route path='setting' element={<Setting />} />
        </Route>
      </Routes>
    </Profile>
  )
}
