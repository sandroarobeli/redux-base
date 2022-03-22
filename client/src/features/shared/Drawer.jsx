// Third party imports
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

// Custom imports
import { selectToken, logout } from "../../redux/userSlice";

const SideDrawer = (props) => {
  // From Redux
  const token = useSelector(selectToken);

  // Convenience Boolean for logged in status
  let isLoggedIn = token !== "" ? true : false;

  return (
    <Drawer
      anchor="left"
      open={props.open}
      onClose={props.onClose}
      transitionDuration={750}
      elevation={16}
    >
      <Stack
        direction="column"
        spacing={5}
        sx={{
          width: "20rem",
          marginTop: "3rem",
        }}
      >
        <Button
          disableRipple
          color="inherit"
          component={Link}
          to="/"
          onClick={props.onClose}
          sx={{
            color: "purple",
            fontSize: "1rem",
            "&:active": {
              color: "#f24a9b",
              background: "purple",
            },
          }}
        >
          Main
        </Button>
        {!isLoggedIn && (
          <Button
            disableRipple
            color="inherit"
            component={Link}
            to="/login"
            onClick={props.onClose}
            sx={{
              color: "purple",
              fontSize: "1rem",
              "&:active": {
                color: "#f24a9b",
                background: "purple",
              },
            }}
          >
            Login
          </Button>
        )}
        {isLoggedIn && (
          <Button
            disableRipple
            color="inherit"
            component={Link}
            to="/myposts"
            onClick={props.onClose}
            sx={{
              color: "purple",
              fontSize: "1rem",
              "&:active": {
                color: "#f24a9b",
                background: "purple",
              },
            }}
          >
            My Posts
          </Button>
        )}
        {isLoggedIn && (
          <Button
            disableRipple
            color="inherit"
            component={Link}
            to="/"
            onClick={props.onLogout}
            sx={{
              color: "purple",
              fontSize: "1rem",
              "&:active": {
                color: "#f24a9b",
                background: "purple",
              },
            }}
          >
            Logout
          </Button>
        )}
        {!isLoggedIn && (
          <Button
            disableRipple
            color="inherit"
            component={Link}
            to="/signup"
            onClick={props.onClose}
            sx={{
              color: "purple",
              fontSize: "1rem",
              "&:active": {
                color: "#f24a9b",
                background: "purple",
              },
            }}
          >
            Signup
          </Button>
        )}
      </Stack>
    </Drawer>
  );
};

export default SideDrawer;
