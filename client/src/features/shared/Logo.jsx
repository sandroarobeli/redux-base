import React from "react";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <Typography
      variant="h3"
      component="h4"
      sx={{
        fontFamily: "Gloria Hallelujah",
      }}
    >
      <span style={{ color: "red" }}>J</span>
      <span style={{ color: "yellow" }}>o</span>
      <span style={{ color: "lightgreen" }}>k</span>
      <span style={{ color: "cyan" }}>e</span>
      <span style={{ color: "white" }}>-</span>
      <span style={{ color: "orange" }}>R</span>
      <span style={{ color: "brown" }}>e</span>
      <span style={{ color: "yellow" }}>e</span>
      <span style={{ color: "violet" }}>l</span>
    </Typography>
  );
};

export default Logo;
