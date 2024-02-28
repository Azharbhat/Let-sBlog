import "./App.css";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import { DataProvider } from './components/DataContext';
import DetailsBlog from "./components/DetailsBlog";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);

  return (
    <div className="root">
      <React.Fragment >
        <Header />
        <main>
          {/* Wrap the entire Routes with DataProvider */}
          <DataProvider>
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
              <Route path="/blog/:id" element={<DetailsBlog />} /> 
            </Routes>
          </DataProvider>
        </main>
      </React.Fragment>
    </div>
  );
}

export default App;
