import jwt from "jsonwebtoken";
import User from "../models/users.model.js"

export const authProtect = async(req,res,next)=>{
    try {
        const token = req.cookies['jwt']
        if (!token) {
        return res.json({"message":"token is required"})
         }
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        
        if (!verifiedToken) {
            return res.json({"message":"token is invalid"})
        }
        const userData = await User.findById(verifiedToken.userId).select('-password')
        if(!userData){
            return res.json({"message":"user not found!"})
        }
        req.user = userData
        next()
    } catch (error) {
        console.log(error.message)
        return res.json({"message":"server error"})
    }
}