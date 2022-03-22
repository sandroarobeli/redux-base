import React from "react";
import ListItem from "@mui/material/ListItem";

const BlankExcerpt = (props) => {
  return (
    <ListItem
      sx={{
        minWidth: "275px",
        marginBottom: "0.5rem",
        height: props.height,
      }}
    ></ListItem>
  );
};

export default BlankExcerpt;
