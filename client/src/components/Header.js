import React, { useState } from "react";
import { PiListDashesFill } from "react-icons/pi";
import './Header.css'
import {
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [value, setValue] = useState();
  const[display,setDisplay]=useState('none')
  const handleclick=()=>{
   if(display=='none'){
    setDisplay('flex')
   }
   else{
    setDisplay('none')
   }
  }
  const handleMouseEnter=()=>{setDisplay('flex')}
  const handleMouseLeave=()=>{setDisplay('none')}
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(240,130,10,1) 0%, rgba(240,200,10,1) 100%)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h4"
          style={{ textDecoration: "none" }}
        >
          Let'sBlog
        </Typography>
        <button className="btn" onClick={handleclick}><PiListDashesFill /></button>
      </Toolbar>
      

      <div className='auth'  style={{display:display}}>{isLoggedIn && (
        <>
        
          <div className="nav" style={{display:display}} >
      <Tab LinkComponent={Link} to="/" label="All Blogs" />
      <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs " />
      <Tab LinkComponent={Link} to="/blogs/add" label="Create Blogs " /></div>
        </>
      )}
      </div>





      <div className='auth'  style={{display:display}}>{!isLoggedIn && (
        <>
          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
          >
            Sign In
          </Button>
          <Button
            LinkComponent={Link}
            to="/auth"
            variant="contained"
            sx={{ margin: 1, borderRadius: 10 }}
          >
            Sign Up
          </Button>
          
        </>
      )}
      {isLoggedIn && (
        <Button
          onClick={() => dispatch(authActions.logout())}
          LinkComponent={Link}
          to="/"
          variant="contained"
          sx={{ margin: 1, borderRadius: 10 }}
        >
          Log Out
        </Button>
      )}</div>
    </AppBar>
  );
}

export default Header;
