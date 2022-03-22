// Third party
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import BrightnessHighOutlinedIcon from "@mui/icons-material/BrightnessHighOutlined";
import Brightness4OutlinedIcon from "@mui/icons-material/Brightness4Outlined";

// Custom
import SideDrawer from "./Drawer";
import Logo from "./Logo";
import { selectTheme, changeTheme } from "../../redux/themeSlice";
import { selectToken, logout } from "../../redux/userSlice";

const Header = () => {
  // From Redux
  const currentTheme = useSelector(selectTheme);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();

  // Convenience Boolean for logged in status
  let isLoggedIn = token !== "" ? true : false;

  // State management
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Handler functions
  const onThemeChanged = () => {
    dispatch(changeTheme());
  };
  const onDrawerOpened = () => {
    setDrawerOpen(true);
  };
  const onDrawerClosed = () => {
    setDrawerOpen(false);
  };
  const onLogoutClicked = () => {
    dispatch(logout());
    setDrawerOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          height: "5rem",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={onDrawerOpened}
            sx={{
              marginTop: "auto",
              marginRight: "0.5rem",
              marginLeft: "0.25rem",
              display: {
                mobile: "block",
                tablet: "none",
                laptop: "none",
              },
            }}
          >
            <MenuIcon
              sx={{
                width: "2.75rem",
                height: "2.75rem",
              }}
            />
          </IconButton>
          <IconButton>
            <Logo />
          </IconButton>
          <Stack
            direction="row"
            spacing={5}
            sx={{
              display: {
                mobile: "none",
                tablet: "block",
                laptop: "block",
              },
            }}
          >
            <Button
              disableRipple
              color="inherit"
              component={Link}
              to="/"
              sx={{
                "&:hover": {
                  color: "#f24a9b",
                  transform: "scale(1.25)",
                },
                "&active": {
                  color: "#f24a9b",
                  transform: "scale(1.25)",
                },
              }}
            >
              Main
            </Button>
            {isLoggedIn && (
              <Button
                disableRipple
                color="inherit"
                component={Link}
                to="/myposts"
                sx={{
                  "&:hover": {
                    color: "#f24a9b",
                    transform: "scale(1.25)",
                  },
                  "&active": {
                    color: "#f24a9b",
                    transform: "scale(1.25)",
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
                onClick={onLogoutClicked}
                sx={{
                  "&:hover": {
                    color: "#f24a9b",
                    transform: "scale(1.25)",
                  },
                  "&active": {
                    color: "#f24a9b",
                    transform: "scale(1.25)",
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
                to="/login"
                sx={{
                  "&:hover": {
                    color: "#f24a9b",
                    transform: "scale(1.25)",
                  },
                  "&active": {
                    color: "#f24a9b",
                    transform: "scale(1.25)",
                  },
                }}
              >
                Login
              </Button>
            )}
            {!isLoggedIn && (
              <Button
                disableRipple
                color="inherit"
                component={Link}
                to="/signup"
                sx={{
                  "&:hover": {
                    color: "#f24a9b",
                    transform: "scale(1.25)",
                  },
                  "&active": {
                    color: "#f24a9b",
                    transform: "scale(1.25)",
                  },
                }}
              >
                Signup
              </Button>
            )}
            <IconButton
              edge="end"
              color="inherit"
              onClick={onThemeChanged}
              sx={{
                marginRight: {
                  mobile: "0.25rem",
                  table: "0.5rem",
                  laptop: "1rem",
                },
              }}
            >
              {currentTheme ? (
                <Brightness4OutlinedIcon sx={{ width: "2.5rem", height: "2.5rem" }} />
              ) : (
                <BrightnessHighOutlinedIcon sx={{ width: "2.5rem", height: "2.5rem" }} />
              )}
            </IconButton>
          </Stack>
          <SideDrawer open={drawerOpen} onClose={onDrawerClosed} onLogout={onLogoutClicked} />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet />
    </React.Fragment>
  );
};

export default Header;
