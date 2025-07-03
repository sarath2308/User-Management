import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../api/adminAuth";

const AdminLogin = () => {
  const [login, { isSuccess, isError, isLoading }] = useLoginMutation();

  const navigate = useNavigate(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSignIn = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();


    if (trimmedEmail === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      setEmailError("Enter a valid email");
      isValid = false;
    } else {
      setEmailError("");
    }


    if (trimmedPassword === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      try {
        const result = await login({ email: trimmedEmail, password: trimmedPassword });

        if (result?.data) {
          navigate("/dashboard");
        } else if (result?.error) {
           toast.error("Access denied"); 
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d0d23] to-[#221c2f]">
      <div className="w-full max-w-md bg-opacity-10 backdrop-blur-md px-8 py-10 rounded-xl flex flex-col items-center shadow-lg">
        <div className="w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mb-6">
          Admin
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
          }}
          className="w-full mb-2 px-4 py-2 h-12 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {emailError && <p className="text-red-600 text-sm">{emailError}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (passwordError) setPasswordError("");
          }}
          className="w-full mb-2 h-12 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}

        <button
          onClick={handleSignIn}
          className="w-full py-2 mt-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
