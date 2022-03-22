// Third party
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Pagination from "@mui/material/Pagination";

// Custom
import { selectTheme } from "../../redux/themeSlice";
import { selectUsername, selectUserId, selectToken, selectUserPosts } from "../../redux/userSlice";
import {
  selectAllPosts,
  selectPostError,
  selectPostStatus,
  clearError,
  fetchPosts,
  addNewPost,
} from "../../redux/postsSlice";
import LoadingSpinner from "../shared/LoadingSpinner";
import PostExcerpt from "../posts/PostExcerpt";
import ErrorModule from "../shared/ErrorModule";
import BlankExcerpt from "../posts/BlankExcerpt";
import AddPostForm from "../posts/AddPostForm";
import DeleteDialogModal from "../shared/DeleteDialogModal";

const MyPosts = (props) => {
  // From Router
  const navigate = useNavigate();

  // From Redux
  const currentTheme = useSelector(selectTheme);
  const user = useSelector(selectUsername);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(selectPostStatus);
  const postError = useSelector(selectPostError);

  // State management
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentUserPosts, setCurrentUserPosts] = useState([]);

  // Populating/Updating posts
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [posts, postStatus, dispatch]);

  useEffect(() => {
    setCurrentUserPosts(posts.filter((post) => post.user._id === userId));
  }, [posts, dispatch, postStatus]);

  // Handler functions
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleErrorClear = () => {
    dispatch(clearError());
    setTitle("");
    setContent("");
  };

  const handleAddPost = async () => {
    if (title && content && postStatus === "succeeded") {
      try {
        await dispatch(addNewPost({ title, content, user: userId, token: token })).unwrap();
        setTitle("");
        setContent("");
        navigate("/");
      } catch (error) {
        // For debugging only. error gets populated by createAsyncThunk abstraction
        console.log("from SAVE POST submit"); //test
        console.log(error); //test
      }
    }
  };

  // Filter posts created by logged in User
  //const userPosts = posts.filter((post) => post.user._id === userId)

  // Calculate number of empty rows
  const emptyRows = 5 - Math.min(5, currentUserPosts.length - (page - 1) * 5);

  let output;
  if (postStatus === "loading") {
    output = <LoadingSpinner text="loading..." />;
  } else if (postStatus === "succeeded" || postStatus === "idle") {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = currentUserPosts.slice().sort((a, b) => b.date.localeCompare(a.date));
    output = orderedPosts
      .slice((page - 1) * 5, (page - 1) * 5 + 5)
      .map((post) => <PostExcerpt key={post._id} post={post} />);
  } else if (postStatus === "failed" || postError) {
    output = <ErrorModule error={postError} handleClick={handleErrorClear} />;
  }

  return (
    <Box
      component="section"
      style={{
        margin: "3rem auto 1rem auto",
        minHeight: "calc(100vh - 183px)",
        maxWidth: "800px",
        padding: "0 1.5rem",
      }}
    >
      <AddPostForm
        currentTheme={currentTheme}
        title={title}
        onTitleChanged={handleTitleChange}
        content={content}
        onContentChanged={handleContentChange}
        onSavePostClicked={handleAddPost}
        status={postStatus}
        actionDescription="Add a New Post"
        amIinMyposts={true}
      />
      <Typography
        variant="h4"
        component="h5"
        color="secondary"
        sx={{
          textAlign: "center",
          fontFamily: "Gloria Hallelujah",
          marginBottom: "1rem",
        }}
      >
        My Posts
      </Typography>
      <List
        style={{
          listStyle: "none",
          margin: "1rem auto",
        }}
      >
        {output}
        {emptyRows > 0 && <BlankExcerpt height={emptyRows * 239} />}
      </List>
      <Pagination
        variant="outlined"
        color="primary"
        count={Math.ceil(currentUserPosts.length / 5)}
        page={page}
        onChange={handlePageChange}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: {
            mobile: "105%",
          },
        }}
      />
    </Box>
  );
};

export default MyPosts;
