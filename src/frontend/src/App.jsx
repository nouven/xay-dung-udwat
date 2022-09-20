import { Navigate, BrowserRouter, Routes, Route, Outlet } from "react-router-dom"


export default function App() {
  let roles = ""
  const ProtectRoute = ({ x }) => {
    if (!roles) {
      return <Navigate to="/login" />
    }
    console.log(x)
    return <Outlet />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element='login' />
        <Route path="/register" element='register' />
        <Route path="*" element='there is nothing here :404!' />
        <Route element={<ProtectRoute />}>
          <Route path="/home" element='home' />
          <Route path="/about" element='about' />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

