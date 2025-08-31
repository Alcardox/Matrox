import mongoose from "mongoose";

const userdata = mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        match : [/.+\@.+\..+/,'invalid email! plz review']
    },
    password : {
        type : String,
        required : true,
    },
    role :{
        type:String,
        enum :["user","admin","superAdmin"],
        default:"user"
    }
},{ timestamps: true })

const User = mongoose.model("User",userdata);
export default User;