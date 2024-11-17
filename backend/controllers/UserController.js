import mongoose from "mongoose";
import User from "../model/user.js";

// Fetch all users
export const fetchListOfUsers = async (req, res) => {
  let UserList;
  try {
    UserList = await User.find();
    if (!UserList || UserList.length === 0) {
      return res.status(404).json({ message: "No Users found" });
    }
    return res.status(200).json({ UserList });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: "Server error" });
  }
}

// Add new user
export const addNewUser = async (req, res) => {
  const { firstName, lastName, email, phone, company, jobTitle } = req.body;

  try {
    
    const user = await User.create({ firstName, lastName, email, phone, company, jobTitle });
    res.status(201).send({ message: 'User added successfully!', user });
  } catch (error) {
    res.status(500).send({ error: 'Failed to add user', details: error.message });
  }
}

// Delete user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params; // Extract id from params

  if (!mongoose.isValidObjectId(id)) {  // Check if the ID is valid
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const user = await User.findByIdAndDelete(id);  // Find and delete user by ID
    if (!user) {
      return res.status(404).json({ message: "Unable To Delete, User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error('Error while deleting User:', error);
    return res.status(500).json({ message: "Unable to delete" });
  }
}

// Update user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {  // Check if the ID is valid
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const { firstName, lastName, email, phone, company, jobTitle } = req.body;

    const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, phone, company, jobTitle }, { new: true });

    if (!user) {
      return res.status(404).json({ message: "Unable to update, User not found" });
    }

    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error('Error while updating user:', error);
    return res.status(500).json({ message: "Server error" });
  }
}
