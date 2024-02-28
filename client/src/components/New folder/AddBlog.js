import React, { useState } from "react";
import axios from "axios";

const AddBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    imageLink: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/blog/add", blogData);
      console.log(response.data);
      // Handle success, navigate, or show message to the user
    } catch (error) {
      console.error("Error adding blog:", error);
      // Handle error
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={blogData.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          name="content"
          value={blogData.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <input
          type="text"
          name="imageLink"
          value={blogData.imageLink}
          onChange={handleChange}
          placeholder="Image Link"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddBlog;
