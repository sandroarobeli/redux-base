// Vendor
import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";

const DeleteDialogModal = (props) => {
  return (
    <Fragment>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        transitionDuration={500}
        sx={{
          margin: "auto",
          width: {
            mobile: "95%",
            tablet: "80%",
            laptop: "65%",
          },
        }}
      >
        <DialogTitle
          onClose={props.onClose}
          sx={{
            background: "#0d0356",
            color: "white",
            fontWeight: 600,
            padding: "1rem",
          }}
        >
          Are you sure?
        </DialogTitle>
        <DialogContent
          sx={{
            background: "white",
          }}
        >
          <Typography
            variant="body1"
            component="p"
            sx={{
              margin: "1.5rem 0.5rem 1rem 0.5rem",
              textAlign: "center",
            }}
          >
            Do you want to proceed anyway? Note that deletion will be permanent
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            background: "white",
            paddingBottom: "1.5rem",
          }}
        >
          <Button
            variant="outlined"
            onClick={props.cancelDelete}
            sx={{
              color: "#f44336",
              background: "inherit",
              border: "1px solid #f44336",
              "&:hover": {
                color: "white",
                background: "#f44336",
                border: "1px solid #f44336",
              },
              "&:active": {
                color: "white",
                background: "#f44336",
                border: "1px solid #f44336",
              },
              marginRight: "1rem",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={props.confirmDelete}
            sx={{
              color: "white",
              background: "#f44336",
              "&:hover": {
                background: "#ec13c9",
              },
              "&:active": {
                background: "#ec13c9",
              },
              marginLeft: "1rem",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DeleteDialogModal;
