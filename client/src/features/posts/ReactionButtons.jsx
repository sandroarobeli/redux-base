// Third party
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Custom
import { selectTheme } from "../../redux/themeSlice";
//import { reactionAdded } from '../../redux/postsSlice'

const reactionEmoji = {
  thumbsUp: "👍",
  thumbsDown: "👎",
  heart: "❤️",
  hooray: "🎉",
};

const ReactionButtons = (props) => {
  // From Redux
  const currentTheme = useSelector(selectTheme);
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
        key={name}
        type="button"
        variant="outlined"
        //    onClick={() => dispatch(reactionAdded({ postId: props.post._id, reaction: name}))}
        sx={{
          border: currentTheme ? "1px solid black" : "1px solid white",
          transform: {
            mobile: "scale(0.75)",
          },
        }}
      >
        {emoji}
        <span
          style={{
            color: currentTheme ? "black" : "white",
            marginLeft: "5px",
          }}
        >
          {props.post.reactions[name]}
        </span>
      </Button>
    );
  });

  return (
    <Stack
      direction="row"
      spacing={0}
      sx={{
        marginLeft: "-0.5rem",
      }}
    >
      {reactionButtons}
    </Stack>
  );
};

export default ReactionButtons;
