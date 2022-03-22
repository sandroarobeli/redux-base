// Vendor
import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Custom
import { selectTheme } from "../../redux/themeSlice";

const LoadingSpinner = (props) => {
  // From Redux
  const currentTheme = useSelector(selectTheme);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h4" color={currentTheme ? "primary" : "secondary"}>
        {props.text}
      </Typography>
      <CircularProgress color="primary" size={75} thickness={3.75} />
    </Box>
  );
};

export default LoadingSpinner;
