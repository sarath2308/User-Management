
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetUsersQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} from "../../../api/adminDataApi";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isError, error,refetch } = useGetUsersQuery();
  const [addUser, { isLoading: isAdding, }] = useAddUserMutation();
  const [editUser, { isLoading: isEditing }] = useEditUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const [editUserData, setEditUserData] = useState({ id: "", name: "", email: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [formErrors, setFormErrors] = useState({ name: "", email: "", password: "" });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [userToDelete, setUserToDelete] = useState(null);


  const handleLogout = () => {
    navigate("/");
  };

  const validateForm = (formData, isEdit = false) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    let errors = { name: "", email: "", password: "" };
    let isValid = true;

    if (!isEdit && !formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Enter a valid email";
      isValid = false;
    }
    if (!isEdit && !formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (!isEdit && !passwordRegex.test(formData.password.trim())) {
      errors.password =
        "Password must be at least 8 characters, including uppercase, lowercase, a number, and a special character";
      isValid = false;
    }
    setFormErrors(errors);
    return isValid;
  };

  const filteredUsers = users?.userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!validateForm(newUser)) return;

    try {
     const result= await addUser({
        name: newUser.name.trim(),
        email: newUser.email.trim(),
        password: newUser.password.trim(),
      }).unwrap();
      refetch()
      setNewUser({ name: "", email: "", password: "" });
      setShowAddModal(false);
     
        toast.success("User Created"); 
      
    } catch (err) {
      setErrorMessage(err?.data?.message || "Failed to add user");
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!validateForm(editUserData, true)) return;

    try {
      await editUser({
        id: editUserData.id,
        name: editUserData.name.trim(),
        email: editUserData.email.trim(),
      }).unwrap();
      refetch()
      setShowEditModal(false);
       toast.success("User Updated"); 
    } catch (err) {
      setErrorMessage(err?.data?.message || "Failed to edit user");
    }
  };


  const openEditModal = (user) => {
    setEditUserData({ id: user._id, name: user.name, email: user.email });
    setShowEditModal(true);
    console.log(user);
    
  };

 


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d0d23] to-[#221c2f] text-white">
        Loading users...
      </div>
    );
  }

  if (isError) {
    console.error("Error fetching users:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0d0d23] to-[#221c2f] text-red-600">
        Error: {error?.data?.message || "Failed to load users"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d0d23] to-[#221c2f] text-white">
      {/* Navbar */}
      <nav className="bg-opacity-10 backdrop-blur-md shadow-lg p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">MyApp</div>
          <div className="flex space-x-6">
            <Link to="/home" className="text-gray-300 hover:text-pink-500 transition">
              Home
            </Link>
            <Link to="/home#profile" className="text-gray-300 hover:text-pink-500 transition">
              Profile
            </Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-pink-500 transition">
              Dashboard
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

      <div className="max-w-7xl mx-auto py-10 px-4">
        <h1 className="text-4xl font-bold mb-6">Admin Dashboard</h1>

        {/* Search Bar and Add User Button */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={() => setShowAddModal(true)}
            disabled={isAdding}
            className="px-6 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white font-semibold transition disabled:opacity-50"
          >
            {isAdding ? "Adding..." : "Add New User"}
          </button>
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

        {/* Users Table */}
        <div className="bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Member Since</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user._id} className="border-t border-white/10">
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex space-x-2">
                    <button
                      onClick={() => openEditModal(user)}
                      disabled={isEditing || isDeleting}
                      className="px-4 py-1 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button 
                    onClick={() => {
                      setUserToDelete(user._id);
                     setShowDeleteModal(true);
                          }}
                     
                      disabled={isDeleting}
                      className="px-4 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-opacity-10 backdrop-blur-md p-6 rounded-xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Add New User</h2>
            <form onSubmit={handleAddUser}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="w-full mb-2 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {formErrors.name && <p className="text-red-600 mb-2">{formErrors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full mb-2 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {formErrors.email && <p className="text-red-600 mb-2">{formErrors.email}</p>}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full mb-2 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {formErrors.password && <p className="text-red-600 mb-2">{formErrors.password}</p>}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="px-4 py-2 rounded-full bg-pink-500 hover:bg-pink-600 text-white disabled:opacity-50"
                >
                  {isAdding ? "Adding..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
{/*delete modal */}

{showDeleteModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-30">
    <div className="bg-opacity-10 backdrop-blur-md p-6 rounded-xl w-full max-w-md text-white">
      <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
      <p className="mb-6">Are you sure you want to delete this user?</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            try {
              await deleteUser(userToDelete).unwrap();
              refetch()
              setShowDeleteModal(false);
              setUserToDelete(null);
               toast.success("User Deleted"); 
            } catch (err) {
              setErrorMessage(err?.data?.message || "Failed to delete user");
              setShowDeleteModal(false);
            }
          }}
          className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
)}


      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
          <div className="bg-opacity-10 backdrop-blur-md p-6 rounded-xl w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
            <form onSubmit={handleEditUser}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={editUserData.name}
                  onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
                  className="w-full mb-2 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {formErrors.name && <p className="text-red-600 mb-2">{formErrors.name}</p>}
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={editUserData.email}
                  onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                  className="w-full mb-2 px-4 py-2 rounded-full bg-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {formErrors.email && <p className="text-red-600 mb-2">{formErrors.email}</p>}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className="px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
                >
                  {isEditing ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
