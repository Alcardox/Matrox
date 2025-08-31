import express from 'express'
import {signup,login,logout,loginAdmin} from '../controllers/auth.controller.js';


const router = express.Router();


router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post("/admin-login",loginAdmin)

export default router;