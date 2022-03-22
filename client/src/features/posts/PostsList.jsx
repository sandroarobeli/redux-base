// Third party
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// Custom
import {
  selectAllPosts,
  selectPostError,
  selectPostStatus,
  clearError,
  fetchPosts,
} from "../../redux/postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "../posts/TimeAgo";
import ReactionButtons from "./ReactionButtons";
import LoadingSpinner from "../shared/LoadingSpinner";
import ErrorModule from "../shared/ErrorModule";
import PostExcerpt from "./PostExcerpt";
import BlankExcerpt from "./BlankExcerpt";

const PostsList = (props) => {
  // From Redux
  const posts = useSelector(selectAllPosts);
  const dispatch = useDispatch();
  const postStatus = useSelector(selectPostStatus);
  const postError = useSelector(selectPostError);

  // State management
  const [page, setPage] = useState(1);

  // Populating/Updating posts
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [posts, postStatus, dispatch]);

  // Handler functions
  const onPageChanged = (event, value) => {
    setPage(value);
  };

  const onErrorCleared = () => {
    dispatch(clearError());
  };

  // Calculate number of empty rows
  const emptyRows = 5 - Math.min(5, posts.length - (page - 1) * 5);

  let content;
  if (postStatus === "loading") {
    content = <LoadingSpinner text="loading..." />;
  } else if (postStatus === "succeeded") {
    // Sort posts in reverse chronological order by datetime string
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts
      .slice((page - 1) * 5, (page - 1) * 5 + 5)
      .map((post) => <PostExcerpt key={post._id} post={post} />);
  } else if (postStatus === "failed") {
    content = <ErrorModule error={postError} handleClick={onErrorCleared} />;
  }

  // onDispatch={() => dispatch(postDeleted({ postId: post._id }))}

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
      <Typography
        variant="h3"
        component="h4"
        color="secondary"
        sx={{
          textAlign: "center",
          fontFamily: "Gloria Hallelujah",
        }}
      >
        Posts
      </Typography>
      <List
        style={{
          listStyle: "none",
        }}
      >
        {content}
        {emptyRows > 0 && <BlankExcerpt height={emptyRows * 239} />}
      </List>
      <Pagination
        variant="outlined"
        color="primary"
        count={Math.ceil(posts.length / 5)}
        page={page}
        onChange={onPageChanged}
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

export default PostsList;
