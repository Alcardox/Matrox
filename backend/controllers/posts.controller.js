import mongoose, { mongo } from "mongoose";
import Post from "../models/posts.model.js";

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("author", "username email");
    if (allPosts.length == 0) {
      return res.json({ message: "no post find" });
    }
    res.json(allPosts);
  } catch (error) {
    res.json({ message: "server error" });
    console.log(error.message);
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ message: "post id is not valid" });
    }
    const postData = await Post.findById(id).populate(
      "author",
      "username email"
    );
    if (!postData) {
      return res.json({ message: "data broken" });
    }
    res.json(postData);
  } catch (error) {
    res.json({ message: "server error" });
    console.log(error);
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.user._id;
    if (!title || !description) {
      return res.json({ message: "all fields is required" });
    }
    const newPost = new Post({
      title,
      description,
      author: id,
    });
    if (newPost) {
      await newPost.save();
    }
    res.json({ message: newPost });
  } catch (error) {
    res.json({ message: "server error" });
    console.log(error.message);
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ message: "Post Id is not valid" });
    }

    // Check if post exists and user owns it
    const post = await Post.findById(id);
    if (!post) {
      return res.json({ message: "Post Not Found" });
    }

    // Check if user owns the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.json({ message: "You can only delete your own posts" });
    }

    const deletedPost = await Post.findByIdAndDelete(id);
    res.json({ message: "deleted!", info: deletedPost });
  } catch (error) {
    console.log(error.message);
    res.json({ message: "server error" + error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ message: "Post Id is not valid" });
    }
    if (!title || !description) {
      return res.json({ message: "title and description cant be empty" });
    }

    // Check if post exists and user owns it
    const post = await Post.findById(id);
    if (!post) {
      return res.json({ message: "Post not found" });
    }

    // Check if user owns the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.json({ message: "You can only edit your own posts" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    res.json({ message: "updated successfullt", info: updatedPost });
  } catch (error) {
    console.log(error.message);
    res.json({ message: "server error" + error.message });
  }
};

export const getMyPosts = async(req,res) => {
  try {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).json({"message":"user id is invalid"})
    }
    const postData = await Post.find({author:id}).populate(
      "author",
      "username"
    )
    if (!postData) {
       res.status(400).json({"message":"cannot find this user ID"})
    }
    res.status(200).json(postData)
  } catch (error) {
    res.status(503).json({"ERROR":error})
  }
}
