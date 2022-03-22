import React from "react";
import Typography from "@mui/material/Typography";

const PostAuthor = (props) => {
  const author = props.author;
  return (
    <Typography variant="body2">
      <i>By {author ? author : "Unknown"}</i>
    </Typography>
  );
};

export default PostAuthor;
