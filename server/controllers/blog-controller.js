import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";
import Comments from "../model/Comments.js";

export const getAllBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No Blog Found!" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, content, images, user } = req.body;
  // Check if image data is provided
  if (!images || !images.length) {
    return res.status(400).json({ message: "Image data is required" });
  }

  // Filter out empty strings from the images array
  const filteredImages = images.filter(image => image.trim() !== '');

  // Check if there are any valid images after filtering
  if (filteredImages.length === 0) {
    return res.status(400).json({ message: "At least one valid image is required" });
  }

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    console.error("Error finding user:", error);
    return res.status(500).json({ message: "Error finding user" });
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found" });
  }

  const blog = new Blog({
    title,
    content,
    images: filteredImages, // Use the filtered images array
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });

    await session.commitTransaction();
    await session.endSession();

    return res.status(200).json({ blog });
  } catch (error) {
    console.error("Error saving blog:", error);
    return res.status(500).json({ message: "Error saving blog" });
  }
};


export const updateBlog = async (req, res, next) => {
  const { title, content, image } = req.body;

  const blogId = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      content,
      image,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update Blog" });
  }
  return res.status(200).json({ blog });
};

export const getBlogById = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "No blog found!" });
    }

    // Fetch all comments associated with the blog post
    const comments = await Comments.find({ blog: id }).sort({ comment: -1 });
    ;

    return res.status(200).json({ blog, comments });
  } catch (error) {
    console.error("Error fetching blog and comments:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBlog = async (req, res, next) => {
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(req.params.id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

export const getUserById = async (req, res, next) => {
  let userBlogs;
  try {
    userBlogs = await User.findById(req.params.id).populate("blogs");
  } catch (error) {
    console.log(error);
  }
  if (!userBlogs) {
    return res.status(400).json({ message: "No blogs found!" });
  }
  return res.status(200).json({ user : userBlogs });
};

// Add Comment functionality
export const addComment = async (req, res, next) => {
  const { id } = req.params; // Extract the blog post ID from the request params
  const { comment } = req.body; // Assuming commentData contains necessary comment details

  try {
    const blog = await Blog.findById(id);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    else if(comment.length==0){
      return res.json({message:'empty'})
    }

    const newComment = new Comments({
      comment,
      blog: id
    });

    await newComment.save();

    blog.comments.push(newComment);
    await blog.save();

    return res.status(201).json({ message: "Comment added successfully", blog });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
export const addLike = async (req, res) => {
  const { id } = req.params;
  const {liked}=req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    // Increment likes by 1
  if(liked){
    blog.likes += 1;
    await blog.save();
  }
    

    // Send response with updated like count
    res.status(200).json({ message: 'Like added successfully', likes: blog.likes });
  } catch (error) {
    console.error('Error liking the blog post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
