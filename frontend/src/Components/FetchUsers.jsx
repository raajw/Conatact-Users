import React, { useState, useEffect } from "react";
import axios from "axios";
import UsersTable from "./UsersTable"; 

export const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(false); 
  const [showUsers, setShowUsers] = useState(false); // State to toggle UsersTable visibility


  const fetchUsers = async () => {
    setStatus(true); 
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      console.log("Fetched Users:", response.data);
      setUsers(response.data.UserList); // Set users to state
      setStatus(false); 

      toggleUsersVisibility()
      

    } catch (error) {
      console.error("Error fetching users:", error.response?.data || error.message);
      setStatus(false); 
    }
  };

  // Function to toggle visibility of UsersTable
  const toggleUsersVisibility = () => {
    // if (!showUsers && users.length === 0) {
    //   fetchUsers(); // Fetch users only when showing the table
    // }
    setShowUsers((prevState) => !prevState); // Toggle visibility
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      
      {status && <p className="mb-4 text-blue-500">Loading...</p>}

      
    

      {/* Show UsersTable when there are users and status is false (not loading) */}
      {!status && users.length > 0 && showUsers && (
        <>
          <UsersTable users={users} setUsers={setUsers} />
          <button
            onClick={toggleUsersVisibility}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
          >
            Hide Users
          </button>
        </>
      )}

      {/* Show "Show Users" button if table is hidden and there are users */}
      {!showUsers && !status &&( users.length > 0 || users.length===0 )&& (
        <button
          onClick={fetchUsers}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Show Users
        </button>
      )}

      {/* Hide the "Fetch and Show Users" button if users exist */}
      {/* {!showUsers && !status && users.length === 0 && (
        <button
          onClick={fetchUsers}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Fetch Users
        </button>
      )} */}
    </div>
  );
};

export default FetchUsers;
