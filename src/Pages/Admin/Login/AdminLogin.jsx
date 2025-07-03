
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
 const[email,setEmail]=useState()
  const[password,setPassword]=useState()
 const [emailError,setEmailError]=useState()
 const [passwordError,setPasswordError]=useState()

const handleSigIn=async()=>
{

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let check=true;
    const temail=email.trim()
    const tpassword=password.trim()

 if(temail==='')
 {
  setEmailError('Email required')
  check=false;
 }
 if(!emailRegex.test(temail))
 {
  check=false;
  setEmailError('Enter a valid Email')
 }
 if(tpassword==='')
 {
  setPasswordError('Password required')
  check=false;
 }

 if(check)
 {
   try {
  const result=  await signup({name:tname,email:temail,password:tpassword})
   console.log(result);
   

  if(result?.data)
  {
    navigate('/dashboard')
  }
  
   } catch (error) {
    console.log(error);
    
   }
 }

}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d0d23] to-[#221c2f]">
      <div className="w-full max-w-md bg-opacity-10  backdrop-blur-md px-8 py-10 rounded-xl flex flex-col items-center shadow-lg">
        
      
        <div className="w-16 h-16  flex items-center justify-center text-white text-2xl font-bold mb-6">
          Admin 
        </div>
 
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>
          {
            setEmail(e.target.value)
            if(emailError) setEmailError('')
          }
          }
          className="w-full mb-2 px-4 py-2 h-12  rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      {emailError && <p className="text-red-600">
        {emailError}</p>}
      
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>
          {
            setPassword(e.target.value)
            if(passwordError)setPasswordError('')
          }
          }
          className="w-full mb-2 h-12 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
     {passwordError && <span className="text-red-600">
        {passwordError}</span>}
          <button onClick={handleSigIn} className="w-full py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition">
           SignIn
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
