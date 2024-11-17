import React, { useState } from "react";
import axios from "axios";


const UsersTable = ({ users, setUsers }) => {
  console.log('Rendering UsersTable');

  const [editingUser, setEditingUser] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });

  // Function to handle the update of a user
  const handleUpdate = async (userId) => {
    console.log("Updating user with ID:", userId);

    if (!userId) {
      console.error("User ID is undefined or invalid");
      return;
    }

    const fieldToUpdate = Object.keys(updatedData).find(field => updatedData[field]);

    if (!fieldToUpdate) {
      console.error("No field updated");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/update/${userId}`,
        { [fieldToUpdate]: updatedData[fieldToUpdate] } 
      );
      alert("User updated!!")
      console.log("User updated:", response.data);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, [fieldToUpdate]: updatedData[fieldToUpdate] } : user
        )
      );

      setUpdatedData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
      });
      setEditingUser(null);
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
    }
  };

  // Function to handle the deletion of a user
  const handleDelete = async (userId) => {
    console.log("Deleting user with ID:", userId);

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/users/delete/${userId}`
      );
      alert("User Deleted!!")
      console.log("User deleted:", response.data);
     

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error.response?.data || error.message);
    }
  };

  // Handle field edit
  const handleFieldClick = (user, field, value) => {
    setEditingUser(user._id);
    setUpdatedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      {users.length === 0 ? (
        <div className="text-center">
          <p>No users present. <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors">Add User</button></p>
        </div>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-black">First Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">Last Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">Email</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">Phone</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">Company</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">Job Title</th>
              <th className="border border-gray-300 px-4 py-2 text-left text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id || `${user.firstName}-${user.lastName}`} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-black">
                  <input
                    type="text"
                    value={editingUser === user._id ? updatedData.firstName || user.firstName : user.firstName}
                    onChange={(e) => handleFieldClick(user, 'firstName', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-black">
                  <input
                    type="text"
                    value={editingUser === user._id ? updatedData.lastName || user.lastName : user.lastName}
                    onChange={(e) => handleFieldClick(user, 'lastName', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-black">
                  <input
                    type="text"
                    value={editingUser === user._id ? updatedData.email || user.email : user.email}
                    onChange={(e) => handleFieldClick(user, 'email', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-black">
                  <input
                    type="text"
                    value={editingUser === user._id ? updatedData.phone || user.phone : user.phone}
                    onChange={(e) => handleFieldClick(user, 'phone', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-black">
                  <input
                    type="text"
                    value={editingUser === user._id ? updatedData.company || user.company : user.company}
                    onChange={(e) => handleFieldClick(user, 'company', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-black">
                  <input
                    type="text"
                    value={editingUser === user._id ? updatedData.jobTitle || user.jobTitle : user.jobTitle}
                    onChange={(e) => handleFieldClick(user, 'jobTitle', e.target.value)}
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2 text-black">
                  <button
                    onClick={() => handleUpdate(user._id)}
                    className="mr-2 bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UsersTable;
