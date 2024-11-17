import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    type: String,
    required: true,
   
    match: /^[0-9]{10}$/,
  },
  company: {
    type: String,
    required: false,
  },
  jobTitle: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
