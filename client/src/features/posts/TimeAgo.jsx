// Third party
import React from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
import Typography from "@mui/material/Typography";

const TimeAgo = (props) => {
  let timeAgo = "";

  if (props.timestamp) {
    const date = parseISO(props.timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return <Typography variant="body2">{timeAgo}</Typography>;
};

export default TimeAgo;
