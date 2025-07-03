import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = ({handleLogout}) => {
  return (
    <>
        <nav className="bg-opacity-10 backdrop-blur-md shadow-lg p-4 sticky top-0 z-10">
             <div className="max-w-7xl mx-auto flex justify-between items-center">
               <div className="text-2xl font-bold">MyApp</div>
               <div className="flex space-x-6">
                 <Link
                   to="/home"
                   className="text-gray-300 hover:text-pink-500 transition"
                 >
                   Home
                 </Link>
                 <Link
                   to="/home/profile"
                   className="text-gray-300 hover:text-pink-500 transition"
                 >
                   Profile
                 </Link>
                 <button
                   onClick={handleLogout}
                   className="text-gray-300 hover:text-pink-500 transition"
                 >
                   Logout
                 </button>
               </div>
             </div>
           </nav>
    </>
  )
}

export default Navbar