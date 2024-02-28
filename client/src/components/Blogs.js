import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Blog from "./Blog";
import './Blogs.css';


function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/blog");
        const data = res.data;
        setBlogs(data?.blogs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {blogs.map((blog, index) => (
        <div key={blog._id}>
          {/* Use Link component to navigate to the blog details page */}
          <Link
            to={{
              pathname: `/blog/${blog._id}`, // Set the correct pathname for the blog details page
              state: { blogData: blog } // Pass the blog data as state
            }}
          >
            <Blog
              id={blog._id}
              isUser={localStorage.getItem("userId") === blog.user._id}
              title={blog.title}
              content={blog.content}
              image={blog.images}
              userName={blog.user.name}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Blogs;
