import React from "react";
import { useNavigate } from "react-router-dom";
import './Blog.css'
import {
  Card,
  Avatar,
  CardContent,
  CardHeader,
  Typography,
  CardMedia,
  Box,
  IconButton,
} from "@mui/material";
import {
  DeleteForeverOutlined,
  ModeEditOutlineOutlined,
} from "@mui/icons-material";
import axios from "axios";

const Blog = ({ title, content, image, userName, isUser, id }) => {
  const navigate = useNavigate();
  const handleEdit = (event) => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:8000/api/blog/${id}`)
      .catch((err) => console.log(err));

    const data = res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest().then(() => navigate("/"));
  };

  return (
    <div>
      <Card
       className="card"
       
      >
        {isUser && (
          <Box display={"flex"} >
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineOutlined color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverOutlined color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName && userName.charAt(0)}
            </Avatar>
          }
          title={title}
          subheader=""
        />
        <CardMedia className="img"
          component="img"
          image={image[0]}
          alt="Paella dish"
        />
        <CardContent>
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "}
            {content}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;
