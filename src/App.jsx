import React, { Suspense, useState } from 'react'
import './App.css'
import UserLogin from './Pages/User/Login/UserLogin'
import store from './store/store'
import { Provider } from 'react-redux'
import { Route,Routes } from 'react-router-dom'
const UserHomeLazy=React.lazy(()=> import('./Pages/User/Home/UserHome'))
const UserProfileLazy=React.lazy(()=>import('./Pages/User/Profile/Profile'))
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
        
          </Routes>
          </Suspense>
                
            </Provider>
              

          </div>
       
        
          </>
  )
}

export default App


