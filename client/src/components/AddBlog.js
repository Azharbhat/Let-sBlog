import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  InputLabel,
  TextField,
  Typography,
  Button,
} from "@mui/material";

const labelStyle = {
  mb: 1,
  mt: 2,
  fontSize: "24px",
  fontWeight: "bold",
};

const AddBlog = () => {
  const navigate = useNavigate();
  const[Img,setImg]=useState();

  const [inputs, setInputs] = useState({
    title: "",
    content: [],
    images: [],
    user: localStorage.getItem("userId")
  });
  const handleImage = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader();
  
    reader.onload = () => {
      // Assuming setImg is a typo and you meant setInputs
      setInputs((prevValue) => ({
        ...prevValue,
        images: [...prevValue.images, reader.result], // Add the new image to the images array
      }));
    };
  
    reader.readAsDataURL(file); // Read the file content as Data URL
};

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    if (name === "content") {
      const newContent = [...inputs.content];
      newContent[index] = value;
      setInputs((prevInputs) => ({
        ...prevInputs,
        content: newContent,
      }));
    } else {
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: value,
        
      }));
    }
    
  };

  const handleAddContent = () => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      content: [...prevInputs.content, ""],
      images: [...prevInputs.images, ""],
    }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    // Send POST request with FormData
    const res = await axios.post("http://localhost:8000/api/blog/add", inputs);
    const data = res.data;
    console.log(data);
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={2}
          borderColor="secondary.main"
          borderRadius={1}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={5}
          display="flex"
          flexDirection={"column"}
          width={"70%"}
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            color="gray"
            variant="h3"
            textAlign={"center"}
          >
            Create your Blog
          </Typography>
          <InputLabel sx={labelStyle}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          {inputs.content.map((content, index) => (
            <div key={index}>
              <InputLabel sx={labelStyle}>Content</InputLabel>
              <TextField
                name="content"
                onChange={(event) => handleChange(event, index)}
                value={content}
                margin="normal"
                variant="outlined"
              />
              <InputLabel sx={labelStyle}>Image</InputLabel>
              <input type="file" onChange={handleImage} />
            </div>
          ))}
          <Button
            style={{ marginTop: "1rem" }}
            onClick={handleAddContent}
            variant="contained"
            color="primary"
          >
            Add More Content
          </Button>
          <Button
            style={{ marginTop: "1rem" }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit Blog
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
