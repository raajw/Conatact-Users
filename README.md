
# Users Management Application

A React-based application for managing users, featuring inline editing, deletion, and dynamic updates. Backend APIs are built with Node.js and MongoDB.

---

## Setup Instructions

### Prerequisites
Ensure you have Node.js, MongoDB, and Git installed.

### Steps
1. **Clone the repository**
   

2. **Backend Setup:**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Add a `.env` file:
     ```plaintext
     PORT=5000
     MONGO_URI=mongodb://localhost:27017/users_management
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Database Setup:**
   - MongoDB Schema:
     ```javascript
     const mongoose = require('mongoose');
     const UserSchema = new mongoose.Schema({
       firstName: { type: String, required: true },
       lastName: { type: String, required: true },
       email: { type: String, required: true, unique: true },
       phone: { type: String, required: true },
       company: { type: String },
       jobTitle: { type: String },
     });
     module.exports = mongoose.model('User', UserSchema);
     ```
   

4. **Frontend Setup:**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm start
     ```

5. **Run the App:**
   - Access the app at `http://localhost:3000`.
   - Ensure the backend is running at `http://localhost:5000`.

---

### Challenges Faced
During the implementation of the user table with editable fields, a significant challenge was ensuring that when editing a single field of a user, other fields would not disappear. This issue was due to overwriting user data when state updates occurred. The solution involved preserving unchanged fields by merging them with the updated data using a fallback approach (`updatedData[field] || user[field]`).

Another challenge was handling edge cases like updating users with undefined or empty fields, and gracefully managing the deletion of all users to display a fallback message ("No users available.").

Both issues were resolved by improving state management and conditional rendering logic.