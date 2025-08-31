import express from 'express'
import {getAdmin,updateAdmin,loginAdmin} from '../controllers/admin.controller.js'

const router = express.Router();



router.get("/",getAdmin);
router.put("/:id",updateAdmin);
router.post("/",loginAdmin);


export default router