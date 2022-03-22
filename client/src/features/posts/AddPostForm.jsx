// Vendor party
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// Custom
import DeleteDialogModal from "../shared/DeleteDialogModal";
import { selectToken, selectUserId } from "../../redux/userSlice";

const AddPostForm = (props) => {
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
  const handleDeleteUser = async () => {
    setDeleteModalOpen(false);
    console.log("User: " + loggedUser + " has been deleted!"); // test
  };

  // FROM HERE: WRITE CONTROLLER, ROUTE/AUTH, POST-SAVE WITH MODEL TO REMOVE POSTS, THUNK
  // AND FINALLY FINISH handleDeleteUser

  // Disables submit button if false
  const canSave = Boolean(props.title) && Boolean(props.content) && props.status === "succeeded";

  return (
    <Box
      component="section"
      style={{
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "1rem",
        padding: "0 1.5rem",
      }}
    >
      <Typography
        variant="h4"
        component="h3"
        color="secondary"
        sx={{
          textAlign: "center",
          fontFamily: "Gloria Hallelujah",
        }}
      >
        {props.actionDescription}
      </Typography>
      <Box component="form">
        <Stack spacing={2}>
          <TextField
            name="postTitle"
            id="postTitle"
            label={props.currentTheme ? "Post Title" : ""}
            placeholder="Post Title"
            type="text"
            required
            value={props.title}
            onChange={props.onTitleChanged}
            sx={{
              marginTop: "0.5rem",
              border: props.currentTheme ? "none" : "1px solid gray",
              borderRadius: props.currentTheme ? "none" : "7px",
            }}
          />
          <TextField
            name="postContent"
            id="postContent"
            label={props.currentTheme ? "Content" : ""}
            placeholder="Post Content"
            multiline
            required
            minRows={5}
            value={props.content}
            onChange={props.onContentChanged}
            sx={{
              marginTop: "0.5rem",
              border: props.currentTheme ? "none" : "1px solid gray",
              borderRadius: props.currentTheme ? "none" : "7px",
            }}
          />
          <Button
            disableRipple
            type="button"
            variant="contained"
            onClick={props.onSavePostClicked}
            disabled={!canSave}
            sx={{
              "&:hover": {
                background: "#ec13c9",
              },
              "&:active": {
                background: "#ec13c9",
              },
            }}
          >
            Save Post
          </Button>
          {props.amIinMyposts && (
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
              Delete User
            </Button>
          )}
        </Stack>
      </Box>
      <DeleteDialogModal
        open={deleteModalOpen}
        onClose={handleDeleteModalClose}
        cancelDelete={handleDeleteModalClose}
        confirmDelete={handleDeleteUser}
      />
    </Box>
  );
};

export default AddPostForm;
