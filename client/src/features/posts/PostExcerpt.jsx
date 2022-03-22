// Third party
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Custom
import PostAuthor from "./PostAuthor";
import TimeAgo from "../posts/TimeAgo";
import ReactionButtons from "./ReactionButtons";
import DeleteDialogModal from "../shared/DeleteDialogModal";
import { selectToken, selectUserId } from "../../redux/userSlice";
import { deletePost } from "../../redux/postsSlice";

const PostExcerpt = (props) => {
  // From Redux
  const token = useSelector(selectToken);
  const loggedUser = useSelector(selectUserId);
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
      await dispatch(deletePost({ postId: props.post._id, token: token }));
    } catch (error) {
      // For debugging only. error gets populated by createAsyncThunk abstraction
      console.log("from DELETE POST submit"); //test
      console.log(error); //test
    }
    // SET LOADING SPINNER PER REDUX STATUS PER EDIT-POST - ADD-POST LOGIC
    console.log("deleting: " + props.post._id);
    // FROM HERE: --> ADD BACKEND (auth FOR ROUTES & CONTROLLER),
    // ADD THUNK(DOESN'T NEED ACTUAL ERROR HANDLING),
    // DELETES -> REMOVES FROM USER'S POST ARRAY (PER PLACES-APP)
  };

  return (
    <ListItem
      sx={{
        minWidth: "275px",
        // height: '239px',
        //marginBottom: '0.5rem'
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          // marginTop: '0.5rem',
          padding: "0.25rem 0.25rem",
          border: "1px solid grey",
          borderRadius: "7px",
          //margin: 'auto'
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h3">
            {props.post.title}
          </Typography>
          <PostAuthor author={props.post.user.userName} />
          <TimeAgo timestamp={props.post.date} />
          <ReactionButtons post={props.post} />
          <Typography variant="body1" component="p" sx={{ marginTop: "0.75rem" }}>
            {props.post.content.substring(0, 100) + "..."}
          </Typography>
        </CardContent>
        <CardActions>
          <Stack spacing={2} direction="row" sx={{ margin: "auto" }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to={`../../posts/view/${props.post._id}`}
              sx={{
                "&:hover": {
                  background: "#ec13c9",
                },
                "&:active": {
                  background: "#ec13c9",
                },
              }}
            >
              View
            </Button>
            {loggedUser === props.post.user._id && (
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to={`../../posts/edit/${props.post._id}`}
                sx={{
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
            {loggedUser === props.post.user._id && (
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteModalOpen}
                sx={{
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
    </ListItem>
  );
};

export default PostExcerpt;
