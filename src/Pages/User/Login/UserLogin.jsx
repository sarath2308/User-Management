
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSigninMutation, useSignupMutation } from "../../../api/authApi.js";
import { toast } from "react-toastify";
const UserLogin = () => {
const [signup,{data,isLoading,isSuccess,isError}]=useSignupMutation()
const [signin]=useSigninMutation();
const [signStatus,setSignStatus]=useState('SignUp')
const [email,setEmail]=useState('');
const [name,setName]=useState('')
const [password,setPassword]=useState('')
const [nameError,setNameError]=useState('')
const [emailError,setEmailError]=useState('')
const [passwordError,setPasswordError]=useState("")
const navigate=useNavigate()


const resetForm = () => {
  setName('');
  setEmail('');
  setPassword('');
  setNameError('');
  setEmailError('');
  setPasswordError('');
};

const handleSignUp=async()=>
{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
 if(!regex.test(password))
 {
  setPasswordError('choose a strong Password ex.Example@123')
  check=false;
 }

 if(check)
 {
   try {
  const result=  await signup({name:tname,email:temail,password:tpassword})
   console.log(result);

  if(result?.data)
  {
    navigate('/home')
  }
  if (result?.error) {
  const message = result.error.data?.message || 'Signup failed';
  toast.error(message); 
}
  
   } catch (error) {
    const errorMessage = error?.data?.message || 'Login failed';
      toast.error(errorMessage); 
    console.log("error from signup"+error);
    
   }
 }

}

const handleSignIn=async()=>
{
  let check=true;
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
  try
  {
  const result=await signin({email:temail,password:tpassword})

  if(result?.data)
  {
    navigate('/home')
  }
  if (result?.error) {
  const message = result.error.data?.message || 'Signup failed';
  toast.error(message); 
}
}catch(error)
{
  const errorMessage = result.error?.data?.message || 'Login failed';
      toast.error(errorMessage); 
  console.log(error);
  
}
}

}




const handleStatus=()=>
{
  resetForm()
  if(signStatus==='SignUp')
  {
    setSignStatus('SignIn')
  }
  else{
    setSignStatus('SignUp')
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
          onChange={(e)=>{
            setName(e.target.value)
            if(nameError) setNameError('')
          }
          }
          className="w-full mb-2 px-4 py-2 h-12  rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        :''}
        {signStatus==='SignUp'&&nameError?<p className="text-red-600">
          {nameError}
        </p>:''}


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
       {signStatus==='SignUp'?
        <button 
        onClick={handleSignUp}
        className="w-full py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition">
          SignUp
        </button>:
          <button onClick={handleSignIn} className="w-full py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition">
           SignIn
        </button>
}
        {signStatus==='SignUp'?
        <p onClick={()=>handleStatus()}className="mt-4 text-sm text-gray-400 hover:underline cursor-pointer">
        Already have an Account? SignIn
        </p>:<p onClick={()=>handleStatus()} className="mt-4 text-sm text-gray-400 hover:underline cursor-pointer">
      Don't have an Account? SignUp
        </p>}
      </div>
    </div>
  );
};

export default UserLogin;
