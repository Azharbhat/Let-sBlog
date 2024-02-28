import express from "express";
import {
  getAllBlogs,
  addBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getUserById,
  addComment,
  addLike,

} from "../controllers/blog-controller.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getBlogById);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getUserById);
blogRouter.post("/:id/comment", addComment);
blogRouter.post("/:id/like", addLike);

export default blogRouter;
