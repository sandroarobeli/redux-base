// Third Party
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Custom
import { selectTheme } from "../../redux/themeSlice";

const PostNotFound = () => {
  // From Redux
  const currentTheme = useSelector(selectTheme);

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
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="h3">
            Post not found!
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/`}
            sx={{
              border: currentTheme ? "none" : "1px solid gray",
              margin: "auto",
              "&:hover": {
                background: "#ec13c9",
              },
              "&:active": {
                background: "#ec13c9",
              },
            }}
          >
            Back
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default PostNotFound;
