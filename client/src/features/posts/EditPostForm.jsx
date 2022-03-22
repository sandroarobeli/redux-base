// Third party
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Custom
import PostNotFound from "./PostNotFound";
import AddPostForm from "./AddPostForm";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorModule from "../shared/ErrorModule";
import { selectTheme } from "../../redux/themeSlice";
import { selectUsername, selectUserId, selectToken, selectUserPosts } from "../../redux/userSlice";
import {
  selectAllPosts,
  selectPostById,
  selectPostStatus,
  editPost,
  selectPostError,
  clearError,
} from "../../redux/postsSlice";

const EditPostForm = () => {
  const postId = useParams().postId;
  const navigate = useNavigate();

  // From Redux
  const currentTheme = useSelector(selectTheme);
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const postById = useSelector((state) => state.posts.posts.find((post) => post._id === postId));
  const allPosts = useSelector(selectAllPosts);
  const postStatus = useSelector(selectPostStatus);
  const postError = useSelector(selectPostError);
  const dispatch = useDispatch();

  // Local state initialized with existing post title & content
  // In case Post returns undefined, app doesn't crash and displays post not found page
  const [title, setTitle] = useState(!postById ? " " : postById.title);
  const [content, setContent] = useState(!postById ? " " : postById.content);

  // Handler functions
  const onTitleChanged = (event) => {
    setTitle(event.target.value);
  };
  const onContentChanged = (event) => {
    setContent(event.target.value);
  };
  const onErrorCleared = () => {
    dispatch(clearError());
    navigate("/myposts");
    //setTitle(postById.title)
    //setContent(postById.content)
  };
  const onSavePostClicked = async () => {
    if (title && content) {
      try {
        await dispatch(editPost({ title, content, token: token, postId: postId })).unwrap();
        setTitle("");
        setContent("");
        navigate("/myposts");
      } catch (error) {
        // For debugging only. error gets populated by createAsyncThunk abstraction
        console.log("from EDIT POST submit"); //test
        console.log(error); //test
      }
    }
  };

  let output;
  if (postStatus === "loading") {
    output = <LoadingSpinner text="updating..." />;
  } else if (postStatus === "succeeded" || postStatus === "idle") {
    output = (
      <AddPostForm
        currentTheme={currentTheme}
        title={title}
        onTitleChanged={onTitleChanged}
        content={content}
        onContentChanged={onContentChanged}
        onSavePostClicked={onSavePostClicked}
        status={postStatus}
        actionDescription="Edit This Post"
        amIinMyposts={false}
      />
    );
  } else if (postStatus === "failed" || postError) {
    output = <ErrorModule error={postError} handleClick={onErrorCleared} />;
  }
  // FINISH DELETE, RESTART WHERE I LEFT OFF WITH REDUX TUTORIAL

  if (!postById) {
    return <PostNotFound />;
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
      {output}
    </Box>
  );
};

export default EditPostForm;
