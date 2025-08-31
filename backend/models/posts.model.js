import mongoose, { mongo } from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User',
    required : true
  },
},{ timestamps : true });

const Post = mongoose.model('Post',postSchema)

export default Post;
