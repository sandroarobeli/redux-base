// Third party
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Custom
import Header from "./features/shared/Header";
import Footer from "./features/shared/Footer";
import PostsList from "./features/posts/PostsList";
import Signup from "./features/users/Signup";
import Login from "./features/users/Login";
import MyPosts from "./features/users/MyPosts";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import { selectTheme } from "./redux/themeSlice";
import { selectToken, selectTokenExpiration, autoLogin, logout } from "./redux/userSlice";

// Custom theme module. Override default colors, breakpoints etc. to match customer' requirements
const themeLight = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 641,
      laptop: 1008,
    },
  },
  palette: {
    secondary: {
      main: "#ec13c9",
    },
    background: {
      default: "#d1f4f9",
      paper: "#d1f4f9",
    },
  },
});

const themeDark = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 641,
      laptop: 1008,
    },
  },
  palette: {
    primary: {
      main: "#0d0356",
    },
    divider: "#2e11bc",
    background: {
      default: "#160d3d",
      paper: "#160d3d",
    },
    text: {
      primary: "#fff",
      secondary: "darkgray",
    },
  },
});

const App = () => {
  // From Redux
  const currentTheme = useSelector(selectTheme);
  const token = useSelector(selectToken);
  const tokenExpiration = useSelector(selectTokenExpiration);
  const dispatch = useDispatch();

  // Remaining time till auto logout
  let remainingTime = tokenExpiration - new Date().getTime();

  // Convenience Boolean for logged in status
  let isLoggedIn = token !== "" ? true : false;

  if (token && tokenExpiration) {
    setTimeout(() => {
      dispatch(logout());
    }, remainingTime);
  }
  console.log("remainingTime"); //test
  console.log(remainingTime); // test

  // useEffect always runs AFTER the component renders
  // Ensures user stays logged in upon page reload (unless token expired) using localStorage and autoLogin
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    // Making sure besides having a logged in user, the expiration time IS STILL in the future
    if (
      storedData &&
      storedData.token &&
      Number.parseInt(storedData.expiration) > new Date().getTime()
    ) {
      // If so, re-logs the user and KEEPS THE ORIGINAL TIME STAMP INTACT
      dispatch(
        autoLogin({
          userName: storedData.userName,
          userId: storedData.userId,
          email: storedData.email,
          posts: storedData.posts,
          token: storedData.token,
          expiration: storedData.expiration,
        })
      );
    }
  }, [dispatch]);

  return (
    <ThemeProvider theme={currentTheme ? themeLight : themeDark}>
      <CssBaseline />
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Header />
              <Footer />
            </React.Fragment>
          }
        >
          <Route path="" element={<PostsList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {isLoggedIn && <Route path="/myposts" element={<MyPosts />} />}
          <Route path="posts/view/:postId" exact element={<SinglePostPage />} />
          {isLoggedIn && <Route path="posts/edit/:postId" exact element={<EditPostForm />} />}
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
        <Route path="/" element={<Footer />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
