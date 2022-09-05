import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import Header from "./components/Header"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/features/authSlice'

function App() {
  const dispatch = useDispatch()
  // check if user info is stored in local storage 
  const user = JSON.parse(localStorage.getItem('profile'))

  // fire setUser() with user info with it
  useEffect(() => {
    dispatch(setUser(user))
  }, [])


  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/Register' element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
