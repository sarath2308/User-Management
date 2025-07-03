
import React,{useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useGetuserQuery } from "../../../api/userApi";
import Navbar from "../../../Components/Navbar/Navbar";
const UserHome = () => {
  const navigate = useNavigate();

const {data,isSuccess,isLoading,isError}=useGetuserQuery()

 const user=data;

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
  if (isError) {
    navigate('/');
  }
}, [isError, navigate]);

if(isLoading)
{
    return <div>Loading...</div>
}
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d23] to-[#221c2f] text-white">
   
  <Navbar handleLogout={handleLogout} />
    
      <div className="max-w-7xl mx-auto py-10 px-4">
    
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Welcome, {user.name}!</h1>
          <p className="text-gray-300">
            Nice to have you back,Let’s get started!
          </p>
        </section>

        <section id="profile" className="bg-opacity-10 backdrop-blur-md rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 font-medium">Name</label>
              <p className="text-white">{user.name}</p>
            </div>
            <div>
              <label className="text-gray-400 font-medium">Email</label>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <label className="text-gray-400 font-medium">Member Since</label>
              <p className="text-white">july 4 2025</p> 
            </div>
            <button
              className="mt-4 px-6 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition"
              onClick={() => alert("Edit Profile functionality coming soon!")}
            >
              Edit Profile
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserHome;
