import User from "../models/users.model.js";
import { existUserDataCheck } from "../services/existUserDataCheck.js";
import { passHasher } from "../services/password.service.js";
import { tokenGenerator } from "../services/jwtTokenManagement.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.json({ message: "all fields is require!" });
    }
    const existUser = await existUserDataCheck({ username });
    const existEmail = await existUserDataCheck({ email });
    if (existUser) { return res.json({ message: "this username is taken!" });}
    if (existEmail) { return res.json({ message: "this email is taken!" });}
    if (password.length < 6) {
      return res.json({ message: "password cant be lower than 6 character!" });
    }

    const newPass = await passHasher(password);

    const newUser = await new User({
      username,
      email,
      password: newPass,
    });

    if (newUser) {
      await newUser.save();
      const withoutpass = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      };
      tokenGenerator(newUser._id, res);
      return res.json(withoutpass);
    }
  } catch (error) {
    console.log("something wrong while createing account" + error);
    res.json({ message: "some is wrong in server!" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userData = await User.findOne({ username });
    if (!userData) {
      return res.json({ message: "username not found!" });
    }
    const passCheck = await bcrypt.compare(password, userData.password);
    if (!passCheck) {
      return res.json({ message: "password is incorrect!" });
    }
    tokenGenerator(userData._id, res);
    res.json({ message: "login successfully!" });
  } catch (error) {
    console.log("something wrong while createing account" + error);
    res.json({ message: "some is wrong in server!" });
  }
};

export const logout = async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: "lax",
    })
    res.json({"message":"You are logedout!"})
};

export const loginAdmin = async (req,res)=>{
  
}