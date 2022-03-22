// Third party
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Custom
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import PostNotFound from "./PostNotFound";
import DeleteDialogModal from "../shared/DeleteDialogModal";
import { selectTheme } from "../../redux/themeSlice";
import { selectToken, selectUserId } from "../../redux/userSlice";
import { deletePost } from "../../redux/postsSlice";

const SinglePostPage = () => {
  const postId = useParams().postId;
  const navigate = useNavigate();

  // From Redux
  const currentTheme = useSelector(selectTheme);
  const postById = useSelector((state) => state.posts.posts.find((post) => post._id === postId));
  const loggedUser = useSelector(selectUserId);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  // State management
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // Handler functions
  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };
  const handleDeletePost = async () => {
    setDeleteModalOpen(false);
    try {
      await dispatch(deletePost({ postId: postId, token: token }));
      navigate("/myposts");
    } catch (error) {
      // For debugging only. error gets populated by createAsyncThunk abstraction
      console.log("from DELETE POST submit"); //test
      console.log(error); //test
    }
  };

  if (!postById) {
    return <PostNotFound />;
  }

  return (
    <Box
      component="section"
      sx={{
        marginTop: "5rem",
        minWidth: "275px",
        minHeight: "calc(100vh - 183px)",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0 1.5rem",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          marginTop: "0.5rem",
          padding: "0.25rem 0.25rem",
          border: "1px solid grey",
          borderRadius: "7px",
          margin: "auto",
        }}
      >
        <CardContent>
          <Typography variant="h4" component="h2">
            {postById.title}
          </Typography>
          <PostAuthor author={postById.user.userName} />
          <TimeAgo timestamp={postById.date} />
          <ReactionButtons post={postById} />
          <Typography
            variant="body1"
            component="p"
            sx={{
              marginTop: "0.75rem",
            }}
          >
            {postById.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack spacing={2} direction="row">
            {loggedUser === postById.user._id && (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`../../posts/edit/${postId}`}
                sx={{
                  border: currentTheme ? "none" : "1px solid gray",
                  "&:hover": {
                    background: "#ec13c9",
                  },
                  "&:active": {
                    background: "#ec13c9",
                  },
                }}
              >
                Edit
              </Button>
            )}
            {loggedUser === postById.user._id && (
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteModalOpen}
                sx={{
                  border: currentTheme ? "none" : "1px solid gray",
                  "&:hover": {
                    background: "#ec13c9",
                  },
                  "&:active": {
                    background: "#ec13c9",
                  },
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </CardActions>
      </Card>
      <DeleteDialogModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        cancelDelete={handleDeleteModalClose}
        confirmDelete={handleDeletePost}
      />
    </Box>
  );
};

export default SinglePostPage;
