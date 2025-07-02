
import React, { useState } from "react";

const UserLogin = () => {

const [signStatus,setSignStatus]=useState('SignUp')
const [email,setEmail]=useState('');
const [name,setName]=useState('')
const [password,setPassword]=useState('')
const [nameError,setNameError]=useState('')
const [emailError,setEmailError]=useState('')
const [passwordError,setPasswordError]=useState("")
const handleSignUp=()=>
{
   const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    let check=true;
 const tname=name.trim()
 const temail=email.trim()
 const tpassword=password.trim()
 if(tname==='')
 {
  setNameError("Name Required")
  check=false;
 }
 if(temail==='')
 {
  setEmailError('Email required')
  check=false;
 }
 if(tpassword==='')
 {
  setPasswordError('Password required')
  check=false;
 }
 if(!regex.test(password))
 {
  setPasswordError('choose a string Password ex.Example@123')
  check=false;
 }

 if(check)
 {

 }

}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d0d23] to-[#221c2f]">
      <div className="w-full max-w-md bg-opacity-10  backdrop-blur-md px-8 py-10 rounded-xl flex flex-col items-center shadow-lg">
        
      
        <div className="w-16 h-16  flex items-center justify-center text-white text-2xl font-bold mb-6">
          {signStatus==='SignUp'?'SignUp':'LogIn'}
        </div>
       {signStatus==='SignUp'?
       <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full mb-6 px-4 py-2 h-12  rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        :''}
        {signStatus==='SignUp'&&nameError?<p className="text-red-600">
          {nameError}
        </p>:''}


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full mb-6 px-4 py-2 h-12  rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      {emailError && <p className="text-red-600">
        {emailError}</p>}
      
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full mb-6 h-12 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
     {passwordError && <p className="text-red-600">
        {passwordError}</p>}
       {signStatus==='SignUp'?
        <button className="w-full py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition">
          SignUp
        </button>:
          <button className="w-full py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition">
           SignIn
        </button>
}
        {signStatus==='SignUp'?
        <p onClick={()=>setSignStatus('SignIn')}className="mt-4 text-sm text-gray-400 hover:underline cursor-pointer">
        Already have an Account? SignIn
        </p>:<p onClick={()=>setSignStatus('SignUp')} className="mt-4 text-sm text-gray-400 hover:underline cursor-pointer">
      Don't have an Account? SignUp
        </p>}
      </div>
    </div>
  );
};

export default UserLogin;
