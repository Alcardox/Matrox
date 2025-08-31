import express from "express"
import {authProtect} from "../middleware/auth.js"
import {getSingleUser,deleteUser,updateUser} from '../controllers/users.controller.js'

const router = express.Router();



//router.get("/users",getAllUsers); //TODO : move to admin area users dont need take all users data
router.get("/", authProtect, getSingleUser);
router.delete("/",authProtect,deleteUser); //TODO : only authenticated users can delete their profile
router.put("/",authProtect,updateUser); //TODO : only authenticated users can update their profile



export default router;





