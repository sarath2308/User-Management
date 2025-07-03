import React, { Suspense, useState } from 'react'
import './App.css'
import UserLogin from './Pages/User/Login/UserLogin'
import store from './store/store'
import { Provider } from 'react-redux'
import { Route,Routes } from 'react-router-dom'
import AdminLogin from './Pages/Admin/Login/AdminLogin'
import Dashboard from './Pages/Admin/Home/Dashboard'
const UserHomeLazy=React.lazy(()=> import('./Pages/User/Home/UserHome'))
const UserProfileLazy=React.lazy(()=>import('./Pages/User/Profile/Profile'))
import { ToastContainer } from 'react-toastify'
function App() {

  return (
    <>
          <div>
            <Provider store={store}>
              <Suspense fallback={<div>Loading...</div>}>
              
          <Routes>
        <Route path='/' element={<UserLogin />}></Route>
        <Route path="/home" element={<UserHomeLazy />}>
        </Route>
          <Route path="/home/profile" element={<UserProfileLazy />} /> 
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/dashboard' element={<Dashboard />}></Route>
          </Routes>
          <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme='colored'
        />
          </Suspense>
                
            </Provider>
              

          </div>
       
        
          </>
  )
}

export default App


