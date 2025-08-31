import mongoose from "mongoose";
import User from "../models/users.model.js";
import { existUserDataCheck } from "../services/existUserDataCheck.js";

export const getSingleUser = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.json({ message: "invalid user ID!" });
    }
    const existUserId = await existUserDataCheck(req.user._id);
    if (!existUserId) {
      return res.json({ message: "this user ID is not found!" });
    }
    const userData = await User.findById(req.user._id).select({
      password: 0,
      role : 0,
      __v:0
    });
    res.json(userData); // Return user data directly, not wrapped in message
  } catch (error) {
    console.log("error from server" + error);
    res.json({ message: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userData = await User.findByIdAndDelete(req.user._id);
    if (!userData) {
      return res.json({
        message: "user ID not found!",
      });
    }
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "lax",
    });
    res.json({
      message: "user deleted successfully",
      "user detail": {
        id: userData._id,
        username: userData.username,
      },
    });
  } catch (error) {
    console.log("error from server" + error);
    res.json({ message: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    if (!username || !email) {
      return res.json({ message: "username and email are required!" });
    }

    const validId = mongoose.Types.ObjectId.isValid(req.user._id);
    if (!validId) {
      return res.json({ message: "ID is not valid" });
    }

    // Check if username or email already exists (excluding current user)
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
      _id: { $ne: req.user._id },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.json({ message: "this username is taken!" });
      }
      if (existingUser.email === email) {
        return res.json({ message: "this email is taken!" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        username,
        email,
      },
      { new: true }
    ).select("-password");

    if (updatedUser) {
      return res.json(updatedUser);
    }
  } catch (error) {
    console.log(error);
    res.json({ message: "server Error" });
  }
};
