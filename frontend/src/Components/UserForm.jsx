import React, { useState } from "react";
import axios from "axios";
import FetchUsers from "./FetchUsers"; 

const UserForm = () => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/add",
        formData
      );

      console.log("Response:", response.data);
      setStatus("User added successfully!");
      
     
      setTimeout(() => {
        setStatus("");
      }, 5000);

      setFormData(initialFormState); // Reset the form
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error.message);
      setStatus("Error adding user.");

      setTimeout(() => {
        setStatus("");
      }, 5000);

    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-gray-100 shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold mb-4">User Details</h2>

        {/* Form Fields */}
        {Object.keys(initialFormState).map((field) => (
          <div className="mb-4" key={field}>
            <label htmlFor={field} className="block text-sm font-medium mb-1">
              {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>

        {status && <p className="mt-4 text-center">{status}</p>}
      </form>

      {/* FetchUsers Component */}
      <div className="mt-8">
        <FetchUsers />
      </div>
    </div>
  );
};

export default UserForm;
