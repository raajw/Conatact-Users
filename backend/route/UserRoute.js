import express from 'express'
import {addNewUser,fetchListOfUsers,updateUser,deleteUser} from '../controllers/UserController.js'
const UserRoute = express.Router();

UserRoute.get('/',fetchListOfUsers);
UserRoute.post('/add',addNewUser);
UserRoute.put('/update/:id',updateUser);
UserRoute.delete('/delete/:id',deleteUser);

export default UserRoute;