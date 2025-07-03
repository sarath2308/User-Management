import React, { useEffect } from 'react';
import { useGetuserQuery, useUploadImageMutation } from '../../../api/userApi'; // adjust path if needed
import profile from '../../../assets/profile.jpg'
import { useNavigate } from 'react-router-dom';
const Profile = () => {
  const { data: user, isLoading, isError, refetch } = useGetuserQuery();
  const [uploadImage]=useUploadImageMutation();
 const navigate=useNavigate()

 useEffect(() => {
  if (isError || !user) {
    navigate('/');
  }
}, [isError, user, navigate]);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profileImage', file);

      try {
      const response = await uploadImage(formData);
      if (response?.data) {
        await refetch(); 
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Error uploading image');
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (isError || !user) return <div className="text-red-500">Failed to load profile.</div>;


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d23] to-[#221c2f] text-white">
    <section id="profile" className="bg-opacity-10 backdrop-blur-md rounded-xl p-8 shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-white">Profile</h2>

      <div className="flex flex-col items-center space-y-4 mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-500 shadow-lg">
            {console.log(user.profileImg)
            }
          <img
            src={user.profileImg|| profile }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <label className="cursor-pointer text-sm bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition">
          Change Photo
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImageChange}
          />
        </label>
      </div>

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
          <p className="text-white">July 3, 2025</p>
        </div>
        <button
          className="mt-4 px-6 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition"
          onClick={() => alert('Edit Profile functionality coming soon!')}
        >
          Edit Profile
        </button>
      </div>
    </section>
    </div>
  );
};

export default Profile;
