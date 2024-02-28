import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FcLikePlaceholder } from "react-icons/fc";
import axios from "axios";
import { FcLike } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const DetailsBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentsdata, setCommentdata] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/blog/${id}`);
        setBlog(response.data.blog);
        setCommentdata(response.data.comments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    

    fetchBlogDetails();
  }, [id]);
 console.log(blog)
  useEffect(() => {
    // Check local storage for liked state on component mount
    const likedState = localStorage.getItem(`liked-${id}`);
    if (likedState === "true") {
      setLiked(true);
    }
  }, [id]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post(`http://localhost:8000/api/blog/${id}/comment`, { comment });
      if (res.data.message === "empty") {
        alert("Write something");
      } else {
       
        const newComment = res.data.comment;
        setCommentdata([...commentsdata, newComment]);
        setComment("");
        navigate(`/`)
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/blog/${id}/like`, { liked: true });
      if (response.status === 200) {
        setLiked(true);
        localStorage.setItem(`liked-${id}`, "true"); // Store liked state in local storage
        setLikeCount(prevCount => prevCount + 1);
      }
    } catch (error) {
      console.error("Error liking the blog post:", error);
    }
  };

  if (loading || !blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m" style={{ display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontFamily: 'unique-font', textAlign: 'center', fontSize: '3rem' }}>{blog.title}</h1>
      {blog.images.map((image, index) => (
        <div key={index} className="blog-section" style={{ display: 'flex',width:'auto', flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
          <div style={{ width: 'auto' }}>
            <img className="imgg" src={image} alt={`Blog Image ${index + 1}`} style={{ width: 'auto', margin: '1rem', }} />
          </div>
          <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ fontSize: 'large', fontFamily: 'sans-serif', lineHeight: '2rem', maxWidth: '100%' }}>{blog.content[index]}</p>
          </div>
        </div>
      ))}
      <div style={{ border: 'solid 1px orange', width: 'auto' }}>
        <button style={{background:'none',padding:'1rem'}} onClick={handleLike} disabled={liked}>
          {liked ? <FcLike style={{width:'1.7rem',height:'1.7rem'}} />: <FcLikePlaceholder />}
        </button>
        <span>{blog.likes}</span>
        <button style={{background:'orange',color:"white",borderRadius:'1rem'}} onClick={() => setShowCommentSection(true)}>Comment</button>
      </div>

      {showCommentSection && (
        <div>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment"
            ></textarea>
            <button type="submit">Submit Comment</button>
          </form>
        </div>
      )}
      <div style={{ border: 'solid 1px orange ',padding:'3rem' }}>
        <h2>Comments</h2>
        {commentsdata.map((dataa, index) => (
          <div key={index} style={{ border: "solid 1px black" ,marginTop:'10px',padding:'1rem'}}>
            <p>{dataa.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsBlog;
