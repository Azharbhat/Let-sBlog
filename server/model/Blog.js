import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: [{
    type: String, // Array of content sections
    required: true,
  }],
  images: [{
    type: String, // Array of image URLs
    required: true,
  }],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [{
    type: mongoose.Types.ObjectId,
    ref: "Comment"
  }],
  likes: {
    type: Number,
    default: 0
  }
});

export default mongoose.model("Blog", blogSchema);
