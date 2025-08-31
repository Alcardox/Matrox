import express from "express";
import { authProtect } from "../middleware/auth.js";
import {getAllPosts,getPost,createPost,deletePost,updatePost,getMyPosts} from "../controllers/posts.controller.js"

const router = express.Router();

router.get("/",getAllPosts);
router.get("/:id", getPost);
router.post("/", authProtect,createPost);
router.delete("/:id",authProtect, deletePost);
router.put("/:id",authProtect, updatePost);
router.get("/user/:id",getMyPosts);

export default router;
