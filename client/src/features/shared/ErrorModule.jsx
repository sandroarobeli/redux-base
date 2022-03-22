// Vendor
import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Custom
import { selectTheme } from "../../redux/themeSlice";

const ErrorModule = (props) => {
  // From Redux
  const currentTheme = useSelector(selectTheme);

  return (
    <Box
      component="section"
      style={{
        marginTop: "3rem",
        minHeight: "calc(100vh - 183px)",
        maxWidth: "500px",
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
          <Typography variant="h5" component="h3" color={currentTheme ? "error" : "secondary"}>
            {props.error}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
          }}
        >
          <Button
            variant="outlined"
            color={currentTheme ? "error" : "secondary"}
            onClick={props.handleClick}
          >
            Clear
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default ErrorModule;
